use crate::models::Inventory;
use mongodb::{
    bson::{doc, to_document, Document},
    options::InsertOneOptions,
    results::InsertOneResult,
    Database,
};

/// # Crear inventario
/// Función para crear un nuevo documento en la bd "inventories"
#[tauri::command]
pub async fn create_inventory(
    db: tauri::State<'_, Database>,
    doc: Inventory,
) -> Result<InsertOneResult, String> {
    let collection = db.collection::<Document>("inventories");
    let document = to_document(&doc).unwrap();
    let options = InsertOneOptions::builder().build();
    if let Ok(result) = collection.insert_one(document, options).await {
        Ok(result)
    } else {
        Err("Couldnt create user".into())
    }
}
