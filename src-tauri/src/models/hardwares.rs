use serde::{Deserialize, Serialize};

/// # Device
/// Estructura del dispositivo
#[derive(Debug, Serialize, Deserialize)]
pub struct Hardware {
    /// Nombre de programa
    pub name: String,
    /// Precio de progama
    pub price: f64,
    /// Año de la máquina
    #[serde(skip_serializing_if = "Option::is_none")]
    pub year: Option<u16>,
    /// Tipo de programa
    /// Ejemplos: ram, Otros...
    pub kind: String,
    /// Si es visible ante sistema
    pub visible: bool,
}
