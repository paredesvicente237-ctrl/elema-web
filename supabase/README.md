# Activación de Mi ELEM

1. Crear un proyecto en Supabase.
2. Ejecutar `migrations/202607180001_customer_portal.sql` desde SQL Editor o Supabase CLI.
3. Copiar `.env.example` a `.env.local` y completar las tres variables de Supabase.
4. En Authentication > URL Configuration, registrar el dominio del sitio y las rutas de redirección.
5. Crear una API key en Resend, verificar el dominio remitente y completar sus variables.
6. Crear un segmento de marketing en Resend y copiar su identificador en `RESEND_MARKETING_SEGMENT_ID`.

La clave `SUPABASE_SERVICE_ROLE_KEY` y `RESEND_API_KEY` son privadas: deben existir solo en el servidor y nunca llevar el prefijo `NEXT_PUBLIC_`.

Los estados, transportista y código de seguimiento se actualizan inicialmente desde el panel de Supabase. Cada cambio de estado debe acompañarse de una fila en `order_events` para aparecer en la línea de tiempo del cliente.
