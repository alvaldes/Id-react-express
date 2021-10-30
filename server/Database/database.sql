--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2021-10-30 11:15:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 25384)
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    username character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    role character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- TOC entry 200 (class 1259 OID 25382)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2851 (class 2604 OID 25387)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2987 (class 0 OID 25384)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users VALUES (6, 'Administrador', 'admin', 'admin@email.com', '$2b$10$pdrvVfZ6T89jKIhkjy4SL.SyRh7G8u6aamFmjr3ZbOgoyCXNTtRe.', 'Administrador');
INSERT INTO public.users VALUES (9, 'Angel Valdés', 'alvaldes', 'alvaldes@gmail.com', '$2b$10$DkIcyEaTELdq43/kifpSseEXSqjQCi3/JDbNInBm6kMJa2nv9REV6', 'Administrador');


--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 42, true);


--
-- TOC entry 2853 (class 2606 OID 25392)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2855 (class 2606 OID 25394)
-- Name: users users_username_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_email_key UNIQUE (username, email);


-- Completed on 2021-10-30 11:15:58

--
-- PostgreSQL database dump complete
--

