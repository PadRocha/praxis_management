use crate::models::responsive_letters::Device;
use serde::{Deserialize, Serialize};

/// # Inventory
/// Proporciona una estructura sobre el tipo de inventario se guarda
#[derive(Debug, Serialize, Deserialize)]
pub struct Inventory {
    /// ID equipo
    pub identifier: String,
    /// Estado de dispositivo
    pub status: String,
    /// Ubicación del equipo
    pub location: String,
    /// Información del dispositivo
    pub device: Option<Device>,
}
