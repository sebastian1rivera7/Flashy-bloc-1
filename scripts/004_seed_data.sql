-- Insertar datos de ejemplo para Santiago de Chile
INSERT INTO public.businesses (name, description, category, address, lat, lng, phone, email, image_url, rating) VALUES
('Café Central', 'Café tradicional en el corazón de Santiago', 'Restaurante', 'Plaza de Armas 123, Santiago Centro', -33.4372, -70.6506, '+56912345678', 'info@cafecentral.cl', '/placeholder.svg?height=200&width=300', 4.5),
('Mall Costanera Center', 'El mall más grande de Sudamérica', 'Shopping', 'Av. Andrés Bello 2425, Providencia', -33.4178, -70.6063, '+56987654321', 'info@costanera.cl', '/placeholder.svg?height=200&width=300', 4.2),
('Emporio La Rosa', 'Heladería artesanal premium', 'Postres', 'Av. Providencia 1406, Providencia', -33.4255, -70.6066, '+56911223344', 'contacto@larosa.cl', '/placeholder.svg?height=200&width=300', 4.8),
('Ripley Plaza de Armas', 'Tienda departamental', 'Retail', 'Estado 359, Santiago Centro', -33.4378, -70.6504, '+56955667788', 'ventas@ripley.cl', '/placeholder.svg?height=200&width=300', 4.0),
('Cine Hoyts La Reina', 'Complejo de cines', 'Entretenimiento', 'Av. Ossa 655, La Reina', -33.4456, -70.5394, '+56933445566', 'info@hoyts.cl', '/placeholder.svg?height=200&width=300', 4.3),
('Farmacia Cruz Verde', 'Farmacia 24 horas', 'Salud', 'Av. Libertador Bernardo O''Higgins 1234', -33.4489, -70.6693, '+56977889900', 'atencion@cruzverde.cl', '/placeholder.svg?height=200&width=300', 4.1);

-- Insertar ofertas de ejemplo
INSERT INTO public.offers (business_id, title, description, discount_type, discount_value, original_price, final_price, is_urgent, max_uses, valid_from, valid_until, terms_conditions) VALUES
((SELECT id FROM public.businesses WHERE name = 'Café Central'), '30% OFF en Desayunos', 'Descuento especial en todos nuestros desayunos hasta las 11:00 AM', 'percentage', 30, 5000, 3500, true, 50, NOW(), NOW() + INTERVAL '2 hours', 'Válido solo hasta las 11:00 AM. No acumulable con otras promociones.'),
((SELECT id FROM public.businesses WHERE name = 'Mall Costanera Center'), '$5.000 de descuento', 'Descuento directo en compras sobre $50.000', 'fixed_amount', 5000, 50000, 45000, false, 100, NOW(), NOW() + INTERVAL '7 days', 'Válido en compras sobre $50.000. Aplica en tiendas participantes.'),
((SELECT id FROM public.businesses WHERE name = 'Emporio La Rosa'), '25% OFF Helados Premium', 'Descuento en toda la línea premium de helados artesanales', 'percentage', 25, 4000, 3000, false, 30, NOW(), NOW() + INTERVAL '3 days', 'No válido en productos ya rebajados.'),
((SELECT id FROM public.businesses WHERE name = 'Ripley Plaza de Armas'), '40% OFF ¡Solo por 1 hora!', 'Mega descuento en ropa seleccionada', 'percentage', 40, 25000, 15000, true, 20, NOW(), NOW() + INTERVAL '1 hour', 'Válido solo en ropa seleccionada. Stock limitado.'),
((SELECT id FROM public.businesses WHERE name = 'Cine Hoyts La Reina'), '2x1 en Entradas', 'Compra una entrada y lleva otra gratis', 'percentage', 50, 6000, 3000, false, 40, NOW(), NOW() + INTERVAL '5 days', 'Válido de lunes a miércoles. No aplica en estrenos.'),
((SELECT id FROM public.businesses WHERE name = 'Farmacia Cruz Verde'), '$3.400 menos en Vitaminas', 'Descuento directo en suplementos vitamínicos', 'fixed_amount', 3400, 12000, 8600, false, 25, NOW(), NOW() + INTERVAL '10 days', 'Válido en vitaminas y suplementos seleccionados.');
