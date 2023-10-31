use crate::models::Inventory;
use mongodb::{bson::doc, options::InsertOneOptions, results::InsertOneResult, Database};
use tauri::State;

/// # Crear inventario
/// Función para crear un nuevo documento en la bd "inventories"
#[tauri::command]
pub async fn create_inventory(
    db: State<'_, Database>,
    document: Inventory,
) -> Result<InsertOneResult, &str> {
    let coll = db.collection::<Inventory>("inventories");
    let options = InsertOneOptions::builder().build();
    match coll.insert_one(document, options).await {
        Ok(result) => Ok(result),
        Err(_) => Err("Couldnt create Doc"),
    }
}
