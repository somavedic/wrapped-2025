import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, region } = body;

    if (!email || !region) {
      return NextResponse.json(
        { error: 'Email and region are required' },
        { status: 400 }
      );
    }

    console.log(`[Subscribe API] Received subscription request for region: ${region}`);

    let privateKey = '';
    let listId = '';

    // Log all env vars to see if they are loaded (DO NOT LOG ACTUAL KEYS)
    console.log('[Subscribe API] Checking Environment Variables:', {
      US_KEY_EXISTS: !!process.env.KLAVIYO_PRIVATE_KEY_US,
      CZ_KEY_EXISTS: !!process.env.KLAVIYO_PRIVATE_KEY_CZ,
      CZ_LIST_ID: process.env.KLAVIYO_LIST_ID_CZ
    });

    switch (region) {
      case 'US-CA':
        privateKey = process.env.KLAVIYO_PRIVATE_KEY_US || '';
        listId = process.env.KLAVIYO_LIST_ID_US || '';
        break;
      case 'SG':
        privateKey = process.env.KLAVIYO_PRIVATE_KEY_SG || '';
        listId = process.env.KLAVIYO_LIST_ID_SG || '';
        break;
      case 'EU':
        privateKey = process.env.KLAVIYO_PRIVATE_KEY_EU || '';
        listId = process.env.KLAVIYO_LIST_ID_EU || '';
        break;
      case 'UK':
        privateKey = process.env.KLAVIYO_PRIVATE_KEY_UK || '';
        listId = process.env.KLAVIYO_LIST_ID_UK || '';
        break;
      case 'DE':
      case 'CH':
      case 'AT':
        privateKey = process.env.KLAVIYO_PRIVATE_KEY_DACH || '';
        listId = process.env.KLAVIYO_LIST_ID_DACH || '';
        break;
      case 'CZ':
        privateKey = process.env.KLAVIYO_PRIVATE_KEY_CZ || '';
        listId = process.env.KLAVIYO_LIST_ID_CZ || '';
        break;
      default:
        // Default fallback (e.g. US)
        privateKey = process.env.KLAVIYO_PRIVATE_KEY_US || '';
        listId = process.env.KLAVIYO_LIST_ID_US || '';
        break;
    }

    console.log(`[Subscribe API] Selected Config for ${region}:`, {
      listId,
      privateKeyExists: !!privateKey,
      privateKeyPrefix: privateKey ? privateKey.substring(0, 4) : 'N/A'
    });

    if (!privateKey || !listId) {
      console.error(`Missing Klaviyo configuration for region: ${region}`);
      return NextResponse.json(
        { error: 'Configuration error for this region' },
        { status: 500 }
      );
    }

    // Call Klaviyo API (Subscribe Profiles to List)
    // Docs: https://developers.klaviyo.com/en/reference/subscribe_profiles
    const response = await fetch(
      `https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${privateKey}`,
          'Content-Type': 'application/vnd.api+json',
          'revision': '2025-07-15'
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              custom_source: 'Elaura',
              list_id: listId,
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email: email,
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: 'SUBSCRIBED'
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Klaviyo API Error:', JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
