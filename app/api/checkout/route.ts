import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/lib/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// TN combined sales tax rate (state 7% + average local ~2.75%)
const TN_TAX_RATE = 0.0975;

// Rush fee tiers
const RUSH_FEE_2DAY = 3500;  // $35.00 in cents
const RUSH_FEE_1DAY = 6500;  // $65.00 in cents

export async function POST(req: NextRequest) {
  try {
    const { productId, selectedOptions, deliveryDate, deliveryType } = await req.json();

    const product = products.find((p) => p.id === productId);
    if (!product || product.isInquiryOnly || !product.price) {
      return NextResponse.json({ error: 'Product not available for purchase' }, { status: 400 });
    }

    // Calculate days until delivery
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const delivery = new Date(deliveryDate);
    delivery.setHours(0, 0, 0, 0);
    const daysOut = Math.round((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysOut < 1) {
      return NextResponse.json({ error: 'Same-day orders are not available.' }, { status: 400 });
    }

    // Build option description
    const optionSummary = selectedOptions && Object.keys(selectedOptions).length > 0
      ? Object.entries(selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ')
      : null;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            description: [product.subtitle, optionSummary].filter(Boolean).join(' — ') || undefined,
            images: product.images[0] ? [`${process.env.NEXT_PUBLIC_SITE_URL}${product.images[0]}`] : [],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      },
    ];

    // Add rush fee line item if applicable
    if (daysOut === 1) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Rush Fee (Next-Day Delivery)' },
          unit_amount: RUSH_FEE_1DAY,
        },
        quantity: 1,
      });
    } else if (daysOut === 2) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Rush Fee (2-Day Delivery)' },
          unit_amount: RUSH_FEE_2DAY,
        },
        quantity: 1,
      });
    }

    // Add TN tax as a line item
    const subtotal = lineItems.reduce((sum, item) => {
      return sum + ((item.price_data?.unit_amount ?? 0) * (item.quantity ?? 1));
    }, 0);
    const taxAmount = Math.round(subtotal * TN_TAX_RATE);

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Tennessee Sales Tax (9.75%)' },
        unit_amount: taxAmount,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${product.slug}`,
      metadata: {
        productId: product.id,
        deliveryDate,
        deliveryType,
        daysOut: String(daysOut),
        selectedOptions: JSON.stringify(selectedOptions ?? {}),
      },
      shipping_address_collection: deliveryType === 'delivery'
        ? { allowed_countries: ['US'] }
        : undefined,
      custom_fields: [
        {
          key: 'special_instructions',
          label: { type: 'custom', custom: 'Special instructions (optional)' },
          type: 'text',
          optional: true,
        },
      ],
      phone_number_collection: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
