/////////////////////////////////////////////////
//
// GiveActorsItemsFromTable.js
// This macro will use an item to identify actors
// and give them items based on a corresponding
// roll table. Useful for giving random weapons
// to NPCs based on a "class."
//
// Usage:
// - Place actor tokens in scene
// - Select desired tokens
// - Run macro
//
/////////////////////////////////////////////////

main();

async function main()
{
    if(canvas.tokens.controlled.length < 1)
    {
        ui.notifications.error("Please select at least one token");
        return;
    }
    const rollTable1 = await game.tables.contents.find(t => t.name === "Item Table 1");
    const rollTable2 = await game.tables.contents.find(t => t.name === "Item Table 2");
    const rollTable3 = await game.tables.contents.find(t => t.name === "Item Table 3");

    const category1  = "category 1";
    const category2  = "category 2";
    const category3  = "category 3";
    
    let actors = canvas.tokens.controlled.map(token => {return token.actor});
    for (let actor of actors)
    {
        if (hasItem(actor, category1))
            assignItem(actor, rollTable1);
        else if (hasItem(actor, category2))
            assignItem(actor, rollTable2);
        else if (hasItem(actor, category3))
            assignItem(actor, rollTable3);
    }
}

function hasItem(actor, itemName)
{
    let item = actor.items.find(item => item.data.name == itemName)
    return item != null && item != undefined
}

async function assignItem(actor, rollTable)
{
    let itemName = (await rollTable.roll()).results[0].data.text;
    let item = await game.data.items.find(w => w.name === itemName);
    actor.createEmbeddedDocuments("Item", [item]);
}