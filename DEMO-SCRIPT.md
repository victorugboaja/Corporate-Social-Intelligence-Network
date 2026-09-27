# CSIN 90-second demo

## Spoken script

Corporate giving teams hear strong stories and then have to judge uneven evidence. CSIN is a human-led way to do that review. Everything in this demonstration is fictional.

I start on the landing page and open Scout. Auth0 protects access, and CSIN records the user’s name and company after login. I set the funding criteria to Ontario and Employment, then select Scout. The match is Ottawa Access Collective, a fictional organization. Its campaign target is a fictional figure, not a real grant.

On the organization profile I choose Proceed to Program Analysis. I open a finding and read the source beside the claim. The limitation stays on screen: reported results are not independently verified. I make that review myself. The voice analyst can discuss the record, but it cannot approve it.

I open Discuss with CSIN Analyst. Talk to CSIN Analyst loads the voice controls without starting a call. I explicitly select Start Call, and I end it myself.

Funding is a separate step that stays locked until every current finding has a human review. On Funds Disbursement I connect a browser wallet, confirm the fixed recipient and explicitly authorize 0.001 devnet SOL plus the network fee. Solana devnet has no monetary value, and CSIN shows a confirmed receipt only after verifying the real transaction details. No fictional Canadian-dollar amount is marked paid.

Prospect List is where an organization added from its profile remains for another look.

## Click sequence

1. Open `/`. Select **Get Started**. Sign in or create an account through Auth0. When **Scout access** appears, enter a name and company, then select **Continue**. Route: `/scout`.
2. Under **Funding Criteria**, set **Province** to Ontario and **Sector** to Employment. Select **Scout**.
3. Open **Ottawa Access Collective**. Route: `/evidence?org=ottawa`. The page is **Organization Profile**, marked **FICTIONAL ORGANIZATION**.
4. Select **Add to Prospect List**, then select **Proceed to Program Analysis**. Route: `/evidence?org=ottawa&view=analysis`.
5. Select each finding tile, read its headline, source and status update, and select **Approve evidence** only after reviewing it. Flagging or correcting requires a note. Treat every rating and dollar figure as fictional demonstration data.
6. Select **Discuss with CSIN Analyst** (**Click to call**). Route: `/analyst.html?org=ottawa`. Select **Talk to CSIN Analyst** to load the controls, then **Start Call**. Select **End call and close** when finished.
7. Return to **Program Analysis** and select **Funds Disbursement** (**Open disbursement**). Route: `/fund.html?org=ottawa`. Connect a devnet browser wallet, verify the recipient, check the explicit 0.001 devnet SOL authorization, then select **Authorize in wallet**. Stop if the wallet or devnet is unavailable.
8. Open **Prospect List**. Route: `/track`. Confirm Ottawa Access Collective appears because it was explicitly added.

## Fallback

If voice, the wallet, or devnet is unavailable, stop before any payment claim and say: "The evidence review and explicit authorization controls are working. The external voice, wallet, or devnet service is unavailable, so I am stopping here rather than presenting a simulated signature as a verified receipt."
