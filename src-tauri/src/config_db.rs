use crate::models::Inventory;
use mongodb::{bson::doc, options::IndexOptions, Client, Database, IndexModel};

pub async fn config_db(client: &Client) -> Result<Database, ()> {
    let db = client.database("praxis");
    let _ = db.create_collection("users", None).await;
    let _ = db.create_collection("responsive_letter", None).await;

    let _ = db.create_collection("inventories", None).await;
    let inventories_index_options = IndexOptions::builder().unique(true).build();
    let inventories_model = IndexModel::builder()
        .keys(doc! { "identifier": 1 })
        .options(inventories_index_options)
        .build();
    db.collection::<Inventory>("inventories")
        .create_index(inventories_model, None)
        .await
        .expect("Error creating index!");

    let _ = db.create_collection("softwares", None).await;
    Ok(db)
}
