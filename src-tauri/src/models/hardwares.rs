use serde::{Deserialize, Serialize};

/// # Device
/// Estructura del dispositivo
#[derive(Debug, Serialize, Deserialize)]
pub struct Hardware {
    /// Nombre de programa
    pub name: String,
    /// Precio de progama
    pub price: f64,
    /// Tipo de programa
    /// Ejemplos: ram, Otros...
    pub kind: String,
}
