use crate::models::Hardware;
use mongodb::{bson::doc, options::InsertOneOptions, results::InsertOneResult, Database};
use tauri::State;

/// # Crear responsiva
/// Función para crear un nuevo documento en la bd "hardware"
#[tauri::command]
pub async fn create_hardware(
    db: State<'_, Database>,
    document: Hardware,
) -> Result<InsertOneResult, &str> {
    let coll = db.collection::<Hardware>("hardwares");
    let options = InsertOneOptions::builder().build();
    match coll.insert_one(document, options).await {
        Ok(result) => Ok(result),
        Err(_) => Err("Couldnt create Doc"),
    }
}
