-- schema.sql — Script para crear la base de datos y tablas del proyecto
-- Ejecutar este archivo en phpMyAdmin o en la terminal de MySQL antes de correr la app

-- Crea la base de datos si no existe y la selecciona
CREATE DATABASE IF NOT EXISTS constructora_db
  CHARACTER SET utf8
  COLLATE utf8_general_ci;

USE constructora_db;

-- -------------------------------------------------------
-- Tabla: proyectos
-- Almacena los proyectos del portafolio de la constructora
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectos (
  id          INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único, se incrementa automáticamente
  num         VARCHAR(5)   NOT NULL,          -- Número visible del proyecto (ej: "01", "02")
  nombre      VARCHAR(100) NOT NULL,          -- Nombre del proyecto
  descripcion TEXT         NOT NULL           -- Descripción larga del proyecto
);

-- Datos iniciales de ejemplo para la tabla proyectos
INSERT INTO proyectos (num, nombre, descripcion) VALUES
  ('01', 'Edificio Central',      'Torre empresarial de 22 pisos ubicada en el corazón financiero de la ciudad, con diseño sostenible y certificación LEED.'),
  ('02', 'Conjunto Residencial',  'Unidades familiares con zonas comunes, seguridad 24/7 y amplias áreas verdes para una vida en comunidad de calidad.'),
  ('03', 'Centro Comercial',      'Espacio comercial moderno con más de 120 locales, zona de comidas y estacionamiento para 500 vehículos.');

-- -------------------------------------------------------
-- Tabla: ventas
-- Almacena los proyectos disponibles en venta o preventa
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS ventas (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  proyecto  VARCHAR(100) NOT NULL,  -- Nombre del proyecto
  ubicacion VARCHAR(150) NOT NULL,  -- Ciudad y sector
  estado    VARCHAR(50)  NOT NULL,  -- Ej: "En construcción", "Preventa", "Disponible"
  precio    VARCHAR(50)  NOT NULL   -- Precio desde (en formato texto para flexibilidad)
);

-- Datos iniciales de ejemplo para la tabla ventas
INSERT INTO ventas (proyecto, ubicacion, estado, precio) VALUES
  ('Edificio Central',     'Bogotá, Centro',        'En construcción', '$1.000.000 COP'),
  ('Conjunto Residencial', 'Medellín, El Poblado',  'Preventa',        '$800.000 COP');

-- -------------------------------------------------------
-- Tabla: mensajes_contacto
-- Almacena los mensajes enviados desde el formulario de contacto
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  mensaje    TEXT         NOT NULL,
  fecha      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP  -- Se guarda automáticamente la fecha de envío
);
