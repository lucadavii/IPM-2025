--
-- PostgreSQL database dump
--

\restrict 17UYsGeA52zspocfogfX04UaYzqd6fxepGeF9tiyVYhIE0Y3D1u3f0XJwySXcvu

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    text text,
    img_url text,
    age_min smallint DEFAULT '0'::smallint,
    age_max smallint DEFAULT '100'::smallint
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- Name: TABLE activities; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.activities IS 'activities';


--
-- Name: activity_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_categories (
    a_id uuid NOT NULL,
    c_id uuid NOT NULL
);


ALTER TABLE public.activity_categories OWNER TO postgres;

--
-- Name: TABLE activity_categories; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.activity_categories IS 'join between activities and their categories';


--
-- Name: activity_goals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_goals (
    a_id uuid NOT NULL,
    g_id uuid NOT NULL
);


ALTER TABLE public.activity_goals OWNER TO postgres;

--
-- Name: TABLE activity_goals; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.activity_goals IS 'join between activities and their goals';


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    p_id uuid NOT NULL,
    e_id uuid NOT NULL,
    n_children smallint DEFAULT '1'::smallint,
    notes text
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: TABLE bookings; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.bookings IS 'booking made by an user for an event';


--
-- Name: COLUMN bookings.notes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.bookings.notes IS 'special needs, allergies, etc.';


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: TABLE categories; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.categories IS 'activity categories';


--
-- Name: child; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.child (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    parent_id uuid,
    name text,
    birthday date
);


ALTER TABLE public.child OWNER TO postgres;

--
-- Name: TABLE child; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.child IS 'join to parents';


--
-- Name: child_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.child_categories (
    ch_id uuid NOT NULL,
    c_id uuid NOT NULL
);


ALTER TABLE public.child_categories OWNER TO postgres;

--
-- Name: TABLE child_categories; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.child_categories IS 'join between child and the categories of interest';


--
-- Name: child_goals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.child_goals (
    ch_id uuid NOT NULL,
    g_id uuid NOT NULL
);


ALTER TABLE public.child_goals OWNER TO postgres;

--
-- Name: TABLE child_goals; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.child_goals IS 'join between child and their improvement goals';


--
-- Name: event_goals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_goals (
    e_id uuid NOT NULL,
    g_id uuid NOT NULL
);


ALTER TABLE public.event_goals OWNER TO postgres;

--
-- Name: TABLE event_goals; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.event_goals IS 'join between event and its goals';


--
-- Name: event_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_tags (
    e_id uuid NOT NULL,
    t_id uuid NOT NULL
);


ALTER TABLE public.event_tags OWNER TO postgres;

--
-- Name: TABLE event_tags; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.event_tags IS 'join between an event and its tags';


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    text text,
    img_url text,
    age_min smallint DEFAULT '0'::smallint,
    age_max smallint DEFAULT '100'::smallint,
    date timestamp with time zone DEFAULT now() NOT NULL,
    location text
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: TABLE events; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.events IS 'Events';


--
-- Name: goals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.goals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.goals OWNER TO postgres;

--
-- Name: TABLE goals; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.goals IS 'activities goals';


--
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id uuid DEFAULT auth.uid() NOT NULL,
    name text NOT NULL,
    surname text,
    img_url text
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- Name: TABLE profile; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.profile IS 'Users'' profiles';


--
-- Name: saved_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_activities (
    p_id uuid NOT NULL,
    a_id uuid NOT NULL
);


ALTER TABLE public.saved_activities OWNER TO postgres;

--
-- Name: TABLE saved_activities; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.saved_activities IS 'collection of activities saved by an user';


--
-- Name: saved_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_events (
    p_id uuid NOT NULL,
    e_id uuid NOT NULL
);


ALTER TABLE public.saved_events OWNER TO postgres;

--
-- Name: TABLE saved_events; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.saved_events IS 'collection of events saved by the user';


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: TABLE tags; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tags IS 'event tags';


--
-- Name: tip_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tip_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tip_categories OWNER TO postgres;

--
-- Name: TABLE tip_categories; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tip_categories IS 'tip categories';


--
-- Name: tip_tip_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tip_tip_categories (
    t_id uuid NOT NULL,
    c_id uuid NOT NULL
);


ALTER TABLE public.tip_tip_categories OWNER TO postgres;

--
-- Name: TABLE tip_tip_categories; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tip_tip_categories IS 'join between tips and their categories';


--
-- Name: tips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tips (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    text text
);


ALTER TABLE public.tips OWNER TO postgres;

--
-- Name: TABLE tips; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tips IS 'Tips';


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: activity_categories activity_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT activity_categories_pkey PRIMARY KEY (a_id, c_id);


--
-- Name: activity_goals activity_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_goals
    ADD CONSTRAINT activity_goals_pkey PRIMARY KEY (a_id, g_id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (p_id, e_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: child_categories child_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child_categories
    ADD CONSTRAINT child_categories_pkey PRIMARY KEY (ch_id, c_id);


--
-- Name: child_goals child_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child_goals
    ADD CONSTRAINT child_goals_pkey PRIMARY KEY (ch_id, g_id);


--
-- Name: child child_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_id_key UNIQUE (id);


--
-- Name: child child_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_pkey PRIMARY KEY (id);


--
-- Name: event_goals event_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_goals
    ADD CONSTRAINT event_goals_pkey PRIMARY KEY (e_id, g_id);


--
-- Name: event_tags event_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_pkey PRIMARY KEY (e_id, t_id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: goals goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: saved_activities saved_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_activities
    ADD CONSTRAINT saved_activities_pkey PRIMARY KEY (p_id, a_id);


--
-- Name: saved_events saved_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_events
    ADD CONSTRAINT saved_events_pkey PRIMARY KEY (p_id, e_id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tip_categories tip_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tip_categories
    ADD CONSTRAINT tip_categories_pkey PRIMARY KEY (id);


--
-- Name: tip_tip_categories tip_tip_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tip_tip_categories
    ADD CONSTRAINT tip_tip_categories_pkey PRIMARY KEY (t_id, c_id);


--
-- Name: tips tips_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tips
    ADD CONSTRAINT tips_pkey PRIMARY KEY (id);


--
-- Name: activity_categories activity_categories_a_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT activity_categories_a_id_fkey FOREIGN KEY (a_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity_categories activity_categories_c_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT activity_categories_c_id_fkey FOREIGN KEY (c_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity_goals activity_goals_a_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_goals
    ADD CONSTRAINT activity_goals_a_id_fkey FOREIGN KEY (a_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity_goals activity_goals_g_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_goals
    ADD CONSTRAINT activity_goals_g_id_fkey FOREIGN KEY (g_id) REFERENCES public.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookings bookings_e_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_e_id_fkey FOREIGN KEY (e_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookings bookings_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.profile(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: child_categories child_categories_c_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child_categories
    ADD CONSTRAINT child_categories_c_id_fkey FOREIGN KEY (c_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: child_categories child_categories_ch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child_categories
    ADD CONSTRAINT child_categories_ch_id_fkey FOREIGN KEY (ch_id) REFERENCES public.child(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: child_goals child_goals_ch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child_goals
    ADD CONSTRAINT child_goals_ch_id_fkey FOREIGN KEY (ch_id) REFERENCES public.child(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: child_goals child_goals_g_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child_goals
    ADD CONSTRAINT child_goals_g_id_fkey FOREIGN KEY (g_id) REFERENCES public.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: child child_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.profile(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_tags event_categories_e_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_categories_e_id_fkey FOREIGN KEY (e_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_goals event_goals_e_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_goals
    ADD CONSTRAINT event_goals_e_id_fkey FOREIGN KEY (e_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_goals event_goals_g_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_goals
    ADD CONSTRAINT event_goals_g_id_fkey FOREIGN KEY (g_id) REFERENCES public.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_tags event_tags_t_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_t_id_fkey FOREIGN KEY (t_id) REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profile profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: saved_activities saved_activities_a_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_activities
    ADD CONSTRAINT saved_activities_a_id_fkey FOREIGN KEY (a_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: saved_activities saved_activities_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_activities
    ADD CONSTRAINT saved_activities_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.profile(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: saved_events saved_events_e_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_events
    ADD CONSTRAINT saved_events_e_id_fkey FOREIGN KEY (e_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: saved_events saved_events_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_events
    ADD CONSTRAINT saved_events_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.profile(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tip_tip_categories tip_tip_categories_c_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tip_tip_categories
    ADD CONSTRAINT tip_tip_categories_c_id_fkey FOREIGN KEY (c_id) REFERENCES public.tip_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tip_tip_categories tip_tip_categories_t_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tip_tip_categories
    ADD CONSTRAINT tip_tip_categories_t_id_fkey FOREIGN KEY (t_id) REFERENCES public.tips(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activities Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.activities FOR SELECT USING (true);


--
-- Name: activity_categories Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.activity_categories FOR SELECT USING (true);


--
-- Name: activity_goals Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.activity_goals FOR SELECT USING (true);


--
-- Name: categories Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.categories FOR SELECT USING (true);


--
-- Name: event_goals Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.event_goals FOR SELECT USING (true);


--
-- Name: event_tags Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.event_tags FOR SELECT USING (true);


--
-- Name: events Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.events FOR SELECT USING (true);


--
-- Name: goals Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.goals FOR SELECT USING (true);


--
-- Name: tags Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.tags FOR SELECT USING (true);


--
-- Name: tip_categories Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.tip_categories FOR SELECT USING (true);


--
-- Name: tip_tip_categories Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.tip_tip_categories FOR SELECT USING (true);


--
-- Name: tips Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.tips FOR SELECT USING (true);


--
-- Name: child_categories Insert child cat; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Insert child cat" ON public.child_categories FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_categories.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: profile Insert own Profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Insert own Profile" ON public.profile FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: child Insert own children; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Insert own children" ON public.child FOR INSERT WITH CHECK ((parent_id = auth.uid()));


--
-- Name: profile Read own Profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Read own Profile" ON public.profile FOR SELECT USING ((auth.uid() = id));


--
-- Name: child Read own child; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Read own child" ON public.child FOR SELECT USING ((parent_id = auth.uid()));


--
-- Name: profile Update own Profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Update own Profile" ON public.profile FOR UPDATE USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: activities; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

--
-- Name: activity_categories; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activity_categories ENABLE ROW LEVEL SECURITY;

--
-- Name: activity_goals; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activity_goals ENABLE ROW LEVEL SECURITY;

--
-- Name: bookings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

--
-- Name: categories; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

--
-- Name: child; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.child ENABLE ROW LEVEL SECURITY;

--
-- Name: child_categories; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.child_categories ENABLE ROW LEVEL SECURITY;

--
-- Name: child_goals; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.child_goals ENABLE ROW LEVEL SECURITY;

--
-- Name: bookings create own booking; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "create own booking" ON public.bookings FOR INSERT WITH CHECK ((p_id = auth.uid()));


--
-- Name: child_categories delete child cat; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "delete child cat" ON public.child_categories FOR DELETE USING ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_categories.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: child_goals delete child goal; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "delete child goal" ON public.child_goals FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_goals.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: bookings delete own booking; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "delete own booking" ON public.bookings FOR DELETE USING ((p_id = auth.uid()));


--
-- Name: child delete own children; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "delete own children" ON public.child FOR DELETE USING ((parent_id = auth.uid()));


--
-- Name: saved_activities delete saved event; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "delete saved event" ON public.saved_activities FOR DELETE USING ((p_id = auth.uid()));


--
-- Name: saved_events delete saved event; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "delete saved event" ON public.saved_events FOR DELETE USING ((p_id = auth.uid()));


--
-- Name: event_goals; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.event_goals ENABLE ROW LEVEL SECURITY;

--
-- Name: event_tags; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.event_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

--
-- Name: goals; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

--
-- Name: child_goals insert child goal; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "insert child goal" ON public.child_goals FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_goals.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: saved_events insert saved event; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "insert saved event" ON public.saved_events FOR INSERT WITH CHECK ((p_id = auth.uid()));


--
-- Name: child_goals inserì child goal; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "inserì child goal" ON public.child_goals FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_goals.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: profile; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

--
-- Name: child_categories read child cat; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "read child cat" ON public.child_categories FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_categories.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: bookings read my bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "read my bookings" ON public.bookings FOR SELECT USING ((p_id = auth.uid()));


--
-- Name: saved_activities read own saved events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "read own saved events" ON public.saved_activities FOR SELECT USING ((p_id = auth.uid()));


--
-- Name: saved_events read saved event; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "read saved event" ON public.saved_events FOR SELECT USING ((p_id = auth.uid()));


--
-- Name: saved_activities save event; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "save event" ON public.saved_activities FOR INSERT WITH CHECK ((p_id = auth.uid()));


--
-- Name: saved_activities; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.saved_activities ENABLE ROW LEVEL SECURITY;

--
-- Name: saved_events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.saved_events ENABLE ROW LEVEL SECURITY;

--
-- Name: tags; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

--
-- Name: tip_categories; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tip_categories ENABLE ROW LEVEL SECURITY;

--
-- Name: tip_tip_categories; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tip_tip_categories ENABLE ROW LEVEL SECURITY;

--
-- Name: tips; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;

--
-- Name: child_categories update child cat; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "update child cat" ON public.child_categories FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_categories.ch_id) AND (child.parent_id = auth.uid()))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_categories.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: child_goals update child goal; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "update child goal" ON public.child_goals FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_goals.ch_id) AND (child.parent_id = auth.uid()))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public.child
  WHERE ((child.id = child_goals.ch_id) AND (child.parent_id = auth.uid())))));


--
-- Name: bookings update own booking; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "update own booking" ON public.bookings FOR UPDATE USING ((p_id = auth.uid())) WITH CHECK ((p_id = auth.uid()));


--
-- Name: child update own children; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "update own children" ON public.child FOR UPDATE USING ((parent_id = auth.uid())) WITH CHECK ((parent_id = auth.uid()));


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: TABLE activities; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activities TO anon;
GRANT ALL ON TABLE public.activities TO authenticated;
GRANT ALL ON TABLE public.activities TO service_role;


--
-- Name: TABLE activity_categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activity_categories TO anon;
GRANT ALL ON TABLE public.activity_categories TO authenticated;
GRANT ALL ON TABLE public.activity_categories TO service_role;


--
-- Name: TABLE activity_goals; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activity_goals TO anon;
GRANT ALL ON TABLE public.activity_goals TO authenticated;
GRANT ALL ON TABLE public.activity_goals TO service_role;


--
-- Name: TABLE bookings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bookings TO anon;
GRANT ALL ON TABLE public.bookings TO authenticated;
GRANT ALL ON TABLE public.bookings TO service_role;


--
-- Name: TABLE categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.categories TO anon;
GRANT ALL ON TABLE public.categories TO authenticated;
GRANT ALL ON TABLE public.categories TO service_role;


--
-- Name: TABLE child; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.child TO anon;
GRANT ALL ON TABLE public.child TO authenticated;
GRANT ALL ON TABLE public.child TO service_role;


--
-- Name: TABLE child_categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.child_categories TO anon;
GRANT ALL ON TABLE public.child_categories TO authenticated;
GRANT ALL ON TABLE public.child_categories TO service_role;


--
-- Name: TABLE child_goals; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.child_goals TO anon;
GRANT ALL ON TABLE public.child_goals TO authenticated;
GRANT ALL ON TABLE public.child_goals TO service_role;


--
-- Name: TABLE event_goals; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.event_goals TO anon;
GRANT ALL ON TABLE public.event_goals TO authenticated;
GRANT ALL ON TABLE public.event_goals TO service_role;


--
-- Name: TABLE event_tags; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.event_tags TO anon;
GRANT ALL ON TABLE public.event_tags TO authenticated;
GRANT ALL ON TABLE public.event_tags TO service_role;


--
-- Name: TABLE events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.events TO anon;
GRANT ALL ON TABLE public.events TO authenticated;
GRANT ALL ON TABLE public.events TO service_role;


--
-- Name: TABLE goals; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.goals TO anon;
GRANT ALL ON TABLE public.goals TO authenticated;
GRANT ALL ON TABLE public.goals TO service_role;


--
-- Name: TABLE profile; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profile TO anon;
GRANT ALL ON TABLE public.profile TO authenticated;
GRANT ALL ON TABLE public.profile TO service_role;


--
-- Name: TABLE saved_activities; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.saved_activities TO anon;
GRANT ALL ON TABLE public.saved_activities TO authenticated;
GRANT ALL ON TABLE public.saved_activities TO service_role;


--
-- Name: TABLE saved_events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.saved_events TO anon;
GRANT ALL ON TABLE public.saved_events TO authenticated;
GRANT ALL ON TABLE public.saved_events TO service_role;


--
-- Name: TABLE tags; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tags TO anon;
GRANT ALL ON TABLE public.tags TO authenticated;
GRANT ALL ON TABLE public.tags TO service_role;


--
-- Name: TABLE tip_categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tip_categories TO anon;
GRANT ALL ON TABLE public.tip_categories TO authenticated;
GRANT ALL ON TABLE public.tip_categories TO service_role;


--
-- Name: TABLE tip_tip_categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tip_tip_categories TO anon;
GRANT ALL ON TABLE public.tip_tip_categories TO authenticated;
GRANT ALL ON TABLE public.tip_tip_categories TO service_role;


--
-- Name: TABLE tips; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tips TO anon;
GRANT ALL ON TABLE public.tips TO authenticated;
GRANT ALL ON TABLE public.tips TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- PostgreSQL database dump complete
--

\unrestrict 17UYsGeA52zspocfogfX04UaYzqd6fxepGeF9tiyVYhIE0Y3D1u3f0XJwySXcvu

