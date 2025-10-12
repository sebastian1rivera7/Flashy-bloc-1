-- Habilitar Row Level Security en todas las tablas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Políticas para tabla users
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_delete_own" ON public.users FOR DELETE USING (auth.uid() = id);

-- Políticas para tabla businesses (lectura pública, escritura solo propietarios)
CREATE POLICY "businesses_select_all" ON public.businesses FOR SELECT USING (is_active = true);
CREATE POLICY "businesses_insert_owner" ON public.businesses FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "businesses_update_owner" ON public.businesses FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "businesses_delete_owner" ON public.businesses FOR DELETE USING (auth.uid() = owner_id);

-- Políticas para tabla offers (lectura pública, escritura solo propietarios del negocio)
CREATE POLICY "offers_select_active" ON public.offers FOR SELECT USING (is_active = true AND valid_until > NOW());
CREATE POLICY "offers_insert_business_owner" ON public.offers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND owner_id = auth.uid())
);
CREATE POLICY "offers_update_business_owner" ON public.offers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND owner_id = auth.uid())
);
CREATE POLICY "offers_delete_business_owner" ON public.offers FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND owner_id = auth.uid())
);

-- Políticas para tabla notifications
CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_insert_own" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "notifications_delete_own" ON public.notifications FOR DELETE USING (auth.uid() = user_id);

-- Políticas para tabla user_offers
CREATE POLICY "user_offers_select_own" ON public.user_offers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_offers_insert_own" ON public.user_offers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_offers_update_own" ON public.user_offers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_offers_delete_own" ON public.user_offers FOR DELETE USING (auth.uid() = user_id);

-- Políticas para tabla user_favorites
CREATE POLICY "user_favorites_select_own" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_favorites_insert_own" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_favorites_update_own" ON public.user_favorites FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_favorites_delete_own" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);
