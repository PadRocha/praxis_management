use crate::models::ResponsiveLetter;
use mongodb::{options::InsertOneOptions, results::InsertOneResult, Database};
use tauri::State;

/// # Crear responsiva
/// Función para crear un nuevo documento en la bd "responsive_letters"
#[tauri::command]
pub async fn create_responsive_letter(
    db: State<'_, Database>,
    document: ResponsiveLetter,
) -> Result<InsertOneResult, &str> {
    let coll = db.collection::<ResponsiveLetter>("responsive_letters");
    let options = InsertOneOptions::builder().build();
    match coll.insert_one(document, options).await {
        Ok(result) => Ok(result),
        Err(_) => Err("Couldnt create Doc"),
    }
}
