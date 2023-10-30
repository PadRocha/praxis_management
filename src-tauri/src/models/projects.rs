use serde::{Deserialize, Serialize};

/// # Device
/// Estructura del Proyecto
#[derive(Debug, Serialize, Deserialize)]
pub struct Project {
    /// Clave de proyecto
    pub key: String,
    // Nombre de cliente
    pub client: String,
    // Dirección de negocio
    pub und: String,
}
