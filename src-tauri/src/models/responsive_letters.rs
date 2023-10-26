use mongodb::bson::{oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};

/// # Device
/// Estructura del dispositivo
#[derive(Debug, Serialize, Deserialize)]
pub struct Device {
    //// Tipo de dispositivo
    pub device_type: String,
    /// Sistema operativo
    pub so: String,
    /// RAM
    pub ram: String,
    /// Disco duro
    pub hard_drive: String,
    /// Procesador
    // TODO: Hacer
    pub processor: ObjectId,
    /// Marca
    pub brand: Option<String>,
    /// Modelo
    pub model: Option<String>,
    /// Número de serie
    pub serial_number: Option<String>,
    /// Notas sobre máquina
    pub notes: Option<String>,
    /// ID del que hizo la responsiva
    pub modified_by: String,
    /// Programas
    pub programs: Vec<ObjectId>,
    /// Anexos
    pub gadgets: Vec<ObjectId>,
}

/// # Responsibility
/// Estructura de las responsivas
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponsiveLetter {
    /// ID equipo
    pub equipment: String,
    /// DN
    pub dn: String,
    /// Cliente
    pub client: String,
    /// Gerente
    pub manager: String,
    /// Proyecto
    pub project: String,
    /// Id recurso
    pub id_resource: String,
    /// Nombre del recurso
    pub resource_name: String,
    /// Permisos
    pub permissions: bool,
    /// Fecha de entrega
    pub delivery_date: DateTime,
    /// Ubicación de entrega
    pub delivery_location: String,
    /// Fecha de devolución
    pub return_date: DateTime,
    /// Ubicación de devolución
    pub return_location: String,
    /// Estado de responsiva
    pub status: String,
    /// Razón Social
    pub company_name: String,
    /// Enviado
    pub envoy: bool,
    /// Información del dispositivo
    pub device: Device,
}
