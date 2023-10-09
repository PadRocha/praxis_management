use crate::models::Software;
use mongodb::{bson::doc, options::InsertOneOptions, results::InsertOneResult, Database};
use tauri::State;

/// # Crear responsiva
/// Función para crear un nuevo documento en la bd "software"
#[tauri::command]
pub async fn create_software(
    db: State<'_, Database>,
    document: Software,
) -> Result<InsertOneResult, String> {
    let coll = db.collection::<Software>("softwares");
    let options = InsertOneOptions::builder().build();
    match coll.insert_one(document, options).await {
        Ok(result) => Ok(result),
        Err(_) => Err("Couldnt create User".into()),
    }
}
