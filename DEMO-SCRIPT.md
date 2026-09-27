# CSIN 90-second demo

## Spoken script

Corporate giving teams hear strong stories and then have to judge uneven evidence. CSIN is a human-led way to do that review. Everything in this demonstration is fictional.

I start on the landing page and open Scout. I set the mandate to Ontario and Employment, then select Scout. The match is Ottawa Access Collective, a fictional organization. Its campaign target is a fictional figure, not a real grant.

On the organization profile I choose Proceed to Program Analysis. I open a finding and read the source beside the claim. The limitation stays on screen: reported results are not independently verified. I make that review myself. The voice analyst can discuss the record, but it cannot approve it.

I open Discuss with CSIN Analyst. The call starts only when I select Talk to CSIN Analyst, and I end it myself.

Funding is a separate step. On Funds Disbursement I check Authorized for human review before Initiate disbursement. The status remains Pending human approval. Solana, if used, is devnet test settlement with no monetary value, and it stays pending until a verified transaction exists. No fictional Canadian-dollar amount is marked paid.

Prospect List is where this demonstration case remains for another look.

## Click sequence

1. Open `/`. Select **Get Started**. If **Scout access** appears, enter a name and company, then select **Continue**. Route: `/scout`.
2. Under **Funding Criteria**, set **Province** to Ontario and **Sector** to Employment. Select **Scout**.
3. Open **Ottawa Access Collective**. Route: `/evidence?org=ottawa`. The page is **Organization Profile**, marked **FICTIONAL ORGANIZATION**.
4. Select **Proceed to Program Analysis**. Route: `/evidence?org=ottawa&view=analysis`.
5. Select a finding tile labeled **Click for more**. Read the headline, source, and status update. This is the human review of the evidence. Treat the rating and the dollar figure as fictional demonstration data.
6. Select **Discuss with CSIN Analyst** (**Click to call**). Route: `/analyst.html?org=ottawa`. Select **Talk to CSIN Analyst** to start and **End call and close** to stop. The control does not start a call by itself.
7. Return to **Program Analysis** and select **Funds Disbursement** (**Open disbursement**). Route: `/fund.html?org=ottawa`. Check **Authorized for human review**, then select **Initiate disbursement**. The status is **Pending human approval**.
8. Open **Prospect List**. Route: `/track`.

## Fallback

If voice, the wallet, or devnet is unavailable, stop before any payment claim and say: "The evidence and the authorization checkbox are in front of us. The voice analyst, wallet, or devnet step is unavailable, so this stays pending human approval. I am not presenting a simulated signature as a verified receipt."
