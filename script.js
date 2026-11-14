"use strict";

// ============================================================
// 1) DATEN: das komplette Stundenplan-TSV (aus der PDF extrahiert)
// ============================================================
const TSV = `﻿Studiengang	Studienjahr	Bereich	Modul	Modulkürzel	Teilmodul	Veranstaltungskürzel	Kürzel alt	SWS	Tag / Termin	Zeit	Lehrveranstaltung	Raum / Ort	Dozent:in	Semester	Hinweis
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Bewegung und Klang	GBK	Teilmodul 1: Audiovisuelle Grundlagen 1	GBK1		2	Do	09:45 – 13:00	Audiovisuelle Grundlagen 1 (A/B)	Z018	Christiane Schmitt	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Bewegung und Klang	GBK	Teilmodul 2: Audiovisuelle Grundlagen 2	GBK2		4	Mo	13:40 – 16:50	Audiovisuelle Grundlagen 2	Z018	Lea Staron	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Computertechnik	GCT	Teilmodul 1: Digitale Technik	GCT1		2	Mi	08:00 – 11:15	Digitale Technik (A/B)	Pool Z153	Volker Keipp	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Computertechnik	GCT	Teilmodul 2: Internettechnik	GCT2		2	Fr	09:00 – 10:30	Internettechnik	Pool Z153	Arno Richter	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Designwissenschaften	GDW	Teilmodul 1: Kunstgeschichte	GDW1		2	Mo	15:20 – 16:50	Kunstgeschichte im 21. Jahrhundert	Z102	Clemens Bellut	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Designwissenschaften	GDW	Teilmodul 2: Kommunikations- und Medientheorie	GDW2		2	Mo	17:00 – 18:30	Kommunikations- und Medientheorie	Z102	Clemens Bellut	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Form und Schrift	GFS	Teilmodul 1: Schrift/Typografie Grundlagen	GFS1		2	Fr	10:40 – 13:40	Schrift/Typografie Grundlagen (A/B)	Zeichensaal C411	Prof. Astrid Farmer	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Form und Schrift	GFS	Teilmodul 2: Gestaltung Grundlagen 1	GFS2		2	Mo	13:40 – 15:10	Gestaltung Grundlagen 1	Z105	Prof. Veruschka Götz	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Form und Schrift	GFS	Teilmodul 3: Gestaltung Grundlagen 2	GFS3		4	Mo	09:45 – 13:00	Gestaltung Grundlagen 2	Z102	Prof. Veruschka Götz	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Fototechnik	GFT	Teilmodul 1: Labor- und Kameratechnik	GFT1		2	Di	13:40 – 18:30	Labor- und Kameratechnik (C/D/E)	Z015	Rainer Diehl	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Fototechnik	GFT	Teilmodul 2: Studiotechnik	GFT2		2	Do	09:45 – 13:00	Studiotechnik (A/B)	Z031	Rüdiger Dunker	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Interaktion	GI	Teilmodul 1: Internetkommunikation	GI1		2	Mi	13:40 – 15:10	Internetkommunikation	Z112	Prof. Habu Wöhlbier	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Interaktion	GI	Teilmodul 2: Design digitaler Medien	GI2		4	Mi	09:45 – 13:00	Design digitaler Medien u. Grundlagen KI	Z102, ab 04.11. in Z056	Prof. Kai Beiderwellen, Prof. Dr. Martin Kim	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Publikationstechnik	GPT	Teilmodul 1: Drucktechnik	GPT1		2	Mo	11:30 – 13:00	Drucktechnik (Theorie B)	Z031	Nadine Zimmer	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Publikationstechnik	GPT	Teilmodul 1: Drucktechnik	GPT1		2	Di	11:30 – 13:00	Drucktechnik (Theorie A)	Z102	Nadine Zimmer	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Publikationstechnik	GPT	Teilmodul 1: Drucktechnik	GPT1		2	Di	13:40 – 16:50	Drucktechnik (Praxis C/D/E)	Druckwerkstatt Z025	Nadine Zimmer	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Publikationstechnik	GPT	Teilmodul 2: DTP-Technik 1	GPT2		2	Mi	11:30 – 13:00	DTP-Technik 1	Pool Z153	Marek Slipek	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Publikationstechnik	GPT	Teilmodul 3: DTP-Technik 2	GPT3		2	Di	09:45 – 11:15	DTP-Technik 2 (A)	Pool Z153	Prof. Veruschka Götz	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Publikationstechnik	GPT	Teilmodul 3: DTP-Technik 2	GPT3		2	Di	11:30 – 13:00	DTP-Technik 2 (B)	Pool Z153	Prof. Veruschka Götz	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Text und Konzept	GTK	Teilmodul 1: Einführung ins (wissenschaftliche) Schreiben	GTK1		2	Mi	15:20 – 16:50	Textwerkstatt I	Z112	Prof. Dr. Moritz Klenk	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Text und Konzept	GTK	Teilmodul 2: Kommunikationsstrategie	GTK2		2	Mi	13:40 – 15:10	Kommunikationsstrategie	Z102	Prof. Kai Beiderwellen	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Zeichnung und Farbe	GZF	Teilmodul 1: Zeichnung und Farbe 1	GZF1		4	Mo	09:45 – 13:00	Zeichnung und Farbe 1 (A)	Zeichensaal C411	Prof. Vroni Schwegler	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Zeichnung und Farbe	GZF	Teilmodul 1: Zeichnung und Farbe 1	GZF1		4	Di	09:45 – 13:00	Zeichnung und Farbe 1 (B)	Zeichensaal C411	Prof. Vroni Schwegler	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Zeichnung und Farbe	GZF	Teilmodul 2: Ausstellungsrezeption	GZF2		2	1. Prüfungswoche, 18. – 22. Januar 2027		Ausstellungsrezeption / Exkursionswoche (1. Prüfungswoche)	Mannheim	Prof. Vroni Schwegler, Prof. Frank Göldner	1	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Zeichnung und Farbe	GZF	Teilmodul 3: Zeichnung und Farbe 2	GZF3		4	Di	13:40 – 16:50	Zeichnung und Farbe 2 (A)	Zeichensaal C411	Prof. Vroni Schwegler	2	
BA	Wintersemester 2026/27	GRUNDLAGEN	Grundlagenmodul Zeichnung und Farbe	GZF	Teilmodul 3: Zeichnung und Farbe 2	GZF3		4	Do	13:40 – 16:50	Zeichnung und Farbe 2 (B) (Erster Termin: 19.11.26)	Zeichensaal C411	Prof. Dr. Martin Kim	2	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Bewegtbild	ABB	Teilmodul 1: Motion Graphics	ABB1		4	Mo	09:45 – 13:00	Motion Graphics	Z018	Prof. Tobias Gallé	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Bewegtbild	ABB	Teilmodul 2: Filmgeschichte	ABB2		2	Di	13:40 – 15:10	Filmgeschichte	Z015	David Borymski	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Design und Schrift	ADS	Teilmodul 1: Corporate Design Typografie	ADS1		4	Mi	09:45 – 13:00	Corporate Design Typografie	Z112	Prof. Astrid Farmer	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Design und Schrift	ADS	Teilmodul 2: Schrift und Typografie	ADS2		2	Mi	08:00 – 9:30	Schrift und Typografie	Z112	Prof. Astrid Farmer	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Transmedia Design	ATD	Teilmodul 1: Advertising Design Basics	ATD1	ADW1	4	Do	09:45 – 13:00	Advertising Design Basics	AD Lab Z-152 / Zeichensaal C411	Prof. Johannes Brückner	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Transmedia Design	ATD	Teilmodul 2: Transmedia Theorie	ATD2	ADW2	2	Do	13:40 – 15:10	Werbung	Z105	Prof. Johannes Brückner	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Digitale Medien	ADM	Teilmodul 1: Information und Kommunikation	ADM1		4	Mi	15:20 – 18:30	Information und Kommunikation	MADLab Z058	Prof. Habu Wöhlbier	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Digitale Medien	ADM	Teilmodul 2: Interface und Vernetzung	ADM2		2	Do	17:00 – 18:30	Interface und Vernetzung	Z105	Christian Fernandez	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Fotografie	AF	Teilmodul 1: Foto Design	AF1		4	Mi	09:45 – 13:00	Foto Design	Foto Z038	Prof. Frank Göldner	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Fotografie	AF	Teilmodul 2: Fotogeschichte	AF2		2	Di	13:40 – 15:10	Fotogeschichte	Pool Z153	Anne Ackermann	3 – 6	
BA	Wintersemester 2026/27	AUFBAUMODULE	Aufbaumodul Kommunikation im Raum	AKR		AKR		6	Fr	13:40 – 15:10	Aufbau Kommunikation im Raum	Z056	Prof. Dr. Martin Kim	3 – 6	
BA	Wintersemester 2026/27	SCHWERPUNKTMODULE	Schwerpunktmodul Audiovisuelle Medien	SAM-HS		SAM-HS	SBR	6	Do	09:45 – 15:10	Hören, Sehen, Fühlen, Verstehen	Z015	Prof. Tobias Gallé	4 – 7	
BA	Wintersemester 2026/27	SCHWERPUNKTMODULE	Schwerpunktmodul Transmedia Design	STD-CC		STD-CC	SAD	6	Do	09:45 – 15:10	Crossmedia Campaigning	Z112	Cora Pereghy	4 – 7	
BA	Wintersemester 2026/27	SCHWERPUNKTMODULE	Schwerpunktmodul Transformation Design	STRD-BD		STRD-BD	SBD	6	Di	08:00 – 13:00	Brand Design	Z105	Prof. Axel Kolaschnik	4 – 7	
BA	Wintersemester 2026/27	SCHWERPUNKTMODULE	Schwerpunktmodul Fotografie	SF-AL		SF-AL		6	Di	09:45 – 15:10	Projektarbeit Thema	Z031	Prof. Frank Göldner	4 – 7	
BA	Wintersemester 2026/27	SCHWERPUNKTMODULE	Schwerpunktmodul Grafik-Design	SGD-BP		SGD-BP		6	Do	08:00 – 13:00	Buch und Publizieren	Z102	Prof. Astrid Farmer	4 – 7	
BA	Wintersemester 2026/27	SCHWERPUNKTMODULE	Schwerpunktmodul Interaktive Medien	SIM-ID		SIM-ID	SIM/FP2	6	Di	08:00 – 13:00	Interaction Design	MADLab Z058	Prof. Habu Wöhlbier	4 – 7	
BA	Wintersemester 2026/27	SCHWERPUNKTMODULE	Schwerpunktmodul Kommunikation im Raum	SKR		SKR		6	nur im Sommersemester		Schwerpunktmodul Kommunikation im Raum		Prof. Dr. Martin Kim	4 – 7	Nur im Sommersemester, nicht im WS 2026/27
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Alltag und Lebenswelt	KAL	Teilmodul 1+2: Soziologie des Alltags (V+S)	KAL-V+S/ VFD-CS	KG2/3, VDFA/B	4	Di	15:20 – 18:30	Common Space (Tools for Conviviality III)	H1107	Prof. Dr. Moritz Klenk	3 – 7	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Designtheorie	KDT	Teilmodul 1: Bild- und Medientheorie	KDT1		3	Mi	10:30 – 13:00	Bild- und Medientheorie	Z015 / Z018	Annie Kurz	3 – 7	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Designtheorie	KDT	Teilmodul 2: Aktuelle Ansätze der Kommunikations- und Medientheorie	KDT2		3	Mi	08:00 – 10:15	Kritik der Medienindustrie	Z015 / Z018	Annie Kurz	3 – 7	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Experimentalität	KE	Teilmodul 1+2: Experimentalität (V+S)	KE-V+S/ VFD-DV	KG2/3, VDFA/B	4	Mo	15:20 – 18:30	Die Vorbereitung (Vorlesung und Seminar)	H0706 / Zeichensaal C411	Prof. Dr. Moritz Klenk	3 – 7	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Fremdsprache	KFS		KFS		4	Do	09:45 – 13:00	English for Design		Sabine Maurer-Neubert	3 – 7	Weitere Kurse im Sprachzentrum der Hochschule
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Psychologie	KP	Teilmodul 1+2: Psychologie Vorlesung + Übung	KP-Ü+V	KPÜ+ KPV	3	Mo	12:00 – 15:10	Psychologie (Vorlesung + Übung)	H709	Prof. Dr. Chirly Dos Santos-Stubbe	3 – 7	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Recht u.Existenzgründung	KR	Teilmodul 1: Recht	KR1		2	Mi	13:40 – 15:10	Grundlagen des Rechts	online	Joy Richard Fatoyinbo	3 – 6	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Recht u.Existenzgründung	KR	Teilmodul 2: Existenzgründung	KR2		2	Do	13:40 – 15:10	Recht und Existenzgründung	Z102	Andreas Heinrich	4 – 7	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Schreiben und Präsentieren	KSP	Teilmodul 1: Textgestaltung: Stil, Ausdruck, Konventionen	KSP1		3	Blockwoche, 09.–13.11.2026, täglich	10:00 – 18:00	Textwerkstatt II für Fortgeschrittene	Z112	Prof. Dr. Moritz Klenk	3 – 7	
BA	Wintersemester 2026/27	KONTEXTMODULE	Kontextmodul Schreiben und Präsentieren	KSP	Teilmodul 2: Präsentationstechnik	KSP2		2	Do	08:00 – 09:30	Präsentationstechnik	Zeichensaal C411	Simone Müller	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Film und Audio	VFI		VFI-GA	VFA, VCF	4	Mi	09:45 – 13:00	The Generalist’s Approach	Z018	Prof. Tobias Gallé	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Film und Audio	VFI		VFI-SB	VFA, VSB	4	Mo	13:40 – 16:50	Storyboard	Z015	Prof. Tobias Gallé	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Forschung im Design	VFD		VFD-KC	VFD, VOG	4	Mi	17:00 – 19:00	Kitchen Collective	Wohnzimmer / Z112	Prof. Dr. Moritz Klenk	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Forschung im Design	VFD		VFD-CS/ KAL	VFD, VOG	4	Di	15:20 – 18:30	Common Space (Tools for Conviviality III)	H1107	Prof. Dr. Moritz Klenk	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Forschung im Design	VFD		VFD-DV/ KE	VFD, VOG	4	Mo	15:20 – 18:30	Die Vorbereitung (Vorlesung und Seminar)	H0706 / Zeichensaal C411	Prof. Dr. Moritz Klenk	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Fotografie	VFO		VFO-IK	VF /FP2	4	Mo	13:40 – 16:50	Individuelle Konzeption	Z031	Prof. Frank Göldner	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Interaktion und Raum	VIR		VIR-KK	VIR /FP2	4	Fr	09:45 – 13:00	Kommunikation mit KI	Z056	Prof. Dr. Martin Kim	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Interaktion und Raum	VIR		VIR-UX	VIR /FP2	4	Di	13:40 – 16:50	User Experience (UX) Design	MADLab Z058	Prof. Habu Wöhlbier	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Interaktion und Raum	VIR		VIR-ML	VIR /FP2	4	Fr	13:40 – 16:50	Offenes Projekt (HTML)	online	Arno Richter	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Schrift, Typografie und Grafikdesign	VTG		VTG-GG	VSTG/FP2	4	Mo	09:45 – 13:00	Generatives Gestalten	Z105	Marek Slipek	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Schrift, Typografie und Grafikdesign	VTG		VTG-SF	VSTG/FP2	4	Fr	13:40 – 16:50	Structure your Font!	Z102	Eric Faulhaber	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodule Schrift, Typografie und Grafikdesign	VTG		VTG-TV	VSTG/FP2	4	Blockwoche, 09.–13.11.2026, täglich + 5 Termine	08:00 – 13:00	Typografische Variation	Z105	Prof. Astrid Farmer	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Zeichnung, Malerei und Druckgrafik	VZD		VZD-IE	VZMD	4	Mi	09:45 – 13:00	Illustration und Experiment	Z102	Prof. Vroni Schwegler	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Ausstellungsgestaltung	VA		VAP, VAK	FP1	4	Mo	13:40 – 16:50	Ausstellungsgestaltung WERKSCHAU	Z105	Prof. Veruschka Götz	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vetiefungsmodul Comlab	VC		VCE, VCS, VCL	FP1	4	Fr	12:00 – 15:20	Comlab Science Slam BRAIN RIOT	COMLAB Z154	Prof. Axel Kolaschnik	3 – 7	
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-UN	VIK	4	Blockwoche, 09.–12.11.2026	ganztags	UNHEARD – Interdisziplinäres Labor für Musik, KI und künstlerische Identität	Zeichensaal C411	Fred Wolter	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-AV	VIK	4	Di	15:20 – 18:30	Angewandtes Visualisierungsprojekt	A012	Prof. Dr. Till Nagel	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-3MS		4	Siehe Fakultät Informatik		3D-Modellierung und Spiel-Entwicklung	Siehe Fakultät Informatik	Dr. Tobias Günther	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-UCPS		4	Siehe Fakultät Informatik		User-centered Cyber Physical Systems	Siehe Fakultät Informatik	Prof. Dr. Anuja Hariharan	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-VRP		4	Siehe Fakultät Informatik		Virtual Reality Project	Siehe Fakultät Informatik	Prof. Dr. Kai Eckert	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-CBM		4	Siehe Fakultät Informatik		Challenge-Based Making	Siehe Fakultät Informatik	Prof. Thomas Smits	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-PD			Siehe inno.space		Product Development Project (PDP)	inno.space	Prof. Kirstin Kohler	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	VERTIEFUNGSMODULE	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-PI			Siehe inno.space		Prototype it yourself (PIY)	inno.space	Prof. Kirstin Kohler	3 – 7	Veranstaltungen anderer Fakultäten; Umfang: 5 ECTS
BA	Wintersemester 2026/27	Kolloquien, Exkursionen und andere Veranstaltungen	Grundlagenmodul Zeichnung und Farbe	GZF	Teilmodul 2: Ausstellungsrezeption	GZF2		2	1. Prüfungswoche: 18.– 22.01.2027		Exkursionswoche Ausstellungsrezeption	MA und mehr	Prof. Vroni Schwegler, Prof. Frank Göldner	1	Wiederholung des GZF2-Eintrags im Abschnitt Grundlagen, andere Raumangabe
BA	Wintersemester 2026/27	Kolloquien, Exkursionen und andere Veranstaltungen	FAQ-D Tutorium					2	Do	18:00 – 19:30	Schulung Grundlagen kreative Softwareprogramme (Ps,Ai,Id)	online	Prof. Veruschka Götz	1 – 7	
BA	Wintersemester 2026/27	Blockwoche (09.–13.11.2026)	Grundlagenmodul Form und Schrift	GFS	Teilmodul 2: Gestaltung Grundlagen 1	GFS2		2	tgl.	ganztags	Gestaltung Grundlagen 1 (A/B)	Z102	Prof. Veruschka Götz	1	Blockwoche: 09.–13.11.2026
BA	Wintersemester 2026/27	Blockwoche (09.–13.11.2026)	Kontextmodul Schreiben und Präsentieren	KSP	Teilmodul 1: Textgestaltung: Stil, Ausdruck, Konventionen	KSP1		3	tgl.	10:00 – 18:00	Textwerkstatt II für Fortgeschrittene	Z112	Prof. Dr. Moritz Klenk	3 – 4	Blockwoche: 09.–13.11.2026 | Auch im regulären Modulabschnitt aufgeführt
BA	Wintersemester 2026/27	Blockwoche (09.–13.11.2026)	Vertiefungsmodul Interdisziplinäre Kontexte	VIK		VIK-UN	VIK	4	09.– 12.11.	ganztags	UNHEARD – Interdisziplinäres Labor für Musik, KI und künstlerische Identität	Zeichensaal C411	Fred Wolter	3 – 7	Blockwoche: 09.–13.11.2026 | Laut Eintrag: 09.–12.11.2026 | Auch im regulären Modulabschnitt aufgeführt
MA	Wintersemester 2026/27	DESIGNMODULE (Wahlpflicht 2 von 3)	Critical Design Lab	CDL	Teilmodul 1: Critical Design Lab 1	CDL1		6	nur im Sommersemester		Critical Design Lab 1		Prof. Kai Beiderwellen	1	Nur im Sommersemester, nicht im WS 2026/27
MA	Wintersemester 2026/27	DESIGNMODULE (Wahlpflicht 2 von 3)	Critical Design Lab	CDL	Teilmodul 2: Critical Design Lab 2	CDL2		6	Do	ab 18:30 h	Critical Design Lab 2	Online	Prof. Kai Beiderwellen	2	
MA	Wintersemester 2026/27	DESIGNMODULE (Wahlpflicht 2 von 3)	Transformation Design Lab	TDL	Teilmodul 1: Transformation Design Lab 1	TDL1		6	nur im Sommersemester		Transformation Design Lab 1		Prof. Axel Kolaschnik	1	Nur im Sommersemester, nicht im WS 2026/27
MA	Wintersemester 2026/27	DESIGNMODULE (Wahlpflicht 2 von 3)	Transformation Design Lab	TDL	Teilmodul 2: Transformation Design Lab 2	TDL2		6	Di	13:40 – 18:30	Transformation Design Lab 2	Z105	Prof. Axel Kolaschnik	2	
MA	Wintersemester 2026/27	DESIGNMODULE (Wahlpflicht 2 von 3)	Experimental Interactives Lab	EGL	Teilmodul 1: Experimental Interactives Lab 1	EGL1		6	nur im Sommersemester		Experimental Intractives Lab 1		Prof. Habu Wöhlbier	1	Nur im Sommersemester, nicht im WS 2026/27
MA	Wintersemester 2026/27	DESIGNMODULE (Wahlpflicht 2 von 3)	Experimental Interactives Lab	EGL	Teilmodul 2: Experimental Interactives Lab 2	EGL2		6	Mi	08:00 – 13:00	Experimental Intractives Lab 2	MADLab Z058	Prof. Habu Wöhlbier	2	
MA	Wintersemester 2026/27	FORSCHUNGSMODULE	Politics & Aesthetics	AST		AST		3	nur im Sommersemester		Politics & Aesthetics		Svenja Bickert-Appleby	1	Nur im Sommersemester, nicht im WS 2026/27
MA	Wintersemester 2026/27	FORSCHUNGSMODULE	Bildwissenschaft & Promptographics	BWT		BWT		3	nur im Sommersemester		Bildwissenschaft & Promptographics		Tobias Gallé	1	Nur im Sommersemester, nicht im WS 2026/27
MA	Wintersemester 2026/27	FORSCHUNGSMODULE	Research Thesis	RTP		RTP		3	Mi	15:20 – 17:35	Research Thesis	Z112	Prof. Kai Beiderwellen	2	
MA	Wintersemester 2026/27	GRÜNDUNGS- UND FÜHRUNGSMODULE	Design Management	DM		DM		3	nur im Sommersemester		Design Management		Prof. Axel Kolaschnik	1	Nur im Sommersemester, nicht im WS 2026/27
MA	Wintersemester 2026/27	GRÜNDUNGS- UND FÜHRUNGSMODULE	Existenzgründung & Recht	ER		ER		3	nur im Sommersemester		Existenzgründung & Recht		Till Maier	1	Nur im Sommersemester, nicht im WS 2026/27
MA	Wintersemester 2026/27	GRÜNDUNGS- UND FÜHRUNGSMODULE	Innovation Lab / Mentoring Sessions	CC		CC		3	Di	11:00 – 13:15	Innovation Lab / Mentoring Sessions	Z112	Svenja Bickert-Appleby	2	
MA	Wintersemester 2026/27	Veranstaltung anderer Fakultäten				TDX					Technology Driven Innovation	inno.space	Prof. Kerstin Kohler	2	`;

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];
const DAY_FULL = { Mo: "Montag", Di: "Dienstag", Mi: "Mittwoch", Do: "Donnerstag", Fr: "Freitag" };
const DAY_COLORS = { Mo: "#e11d48", Di: "#d97706", Mi: "#059669", Do: "#2563eb", Fr: "#7c3aed" };

const DAY_START = 8 * 60;    // 08:00 in Minuten
const DAY_END = 19.5 * 60;   // 19:30
const PX_PER_MIN = 1.1;

// ============================================================
// 2) PARSING: TSV-Text -> Array von Kurs-Objekten
// ============================================================
function parseTsv(tsv) {
  const lines = tsv.replace(/^\uFEFF/, "").split("\n").filter(l => l.trim().length > 0);
  return lines.map((line, i) => {
    const c = line.split("\t");
    const tag = (c[9] || "").trim();
    const zeit = (c[10] || "").trim();
    const day = DAYS.includes(tag) ? tag : null;
    const t = day ? parseTime(zeit) : null;
    return {
      id: i,
      studiengang: (c[0] || "").trim(),
      bereich: (c[2] || "").trim(),
      modul: (c[3] || "").trim(),
      kuerzel: (c[4] || "").trim(),
      teilmodul: (c[5] || "").trim(),
      vkuerzel: (c[6] || "").trim(),
      sws: (c[8] || "").trim(),
      tag: tag,
      zeit: zeit,
      name: (c[11] || "").trim(),
      raum: (c[12] || "").trim(),
      dozent: (c[13] || "").trim(),
      semester: (c[14] || "").trim(),
      hinweis: (c[15] || "").trim(),
      day: day,
      start: t ? t[0] : null,
      end: t ? t[1] : null,
    };
  });
}

function parseTime(s) {
  const m = s.match(/(\d{1,2})[:.](\d{2})\s*[–—-]\s*(\d{1,2})[:.](\d{2})/);
  if (!m) return null;
  return [parseInt(m[1], 10) * 60 + parseInt(m[2], 10),
          parseInt(m[3], 10) * 60 + parseInt(m[4], 10)];
}

const COURSES = parseTsv(TSV);

// ============================================================
// ECTS pro Modul – aus den Daten NICHT automatisch ableitbar!
// Die TSV enthält nur SWS (Präsenzstunden), keine ECTS (Workload).
// Hier manuell pflegen; Schlüssel = Modulkürzel bzw.
// Veranstaltungskürzel (falls kein Modulkürzel existiert).
// Bereits belegt: VIK-Module lauten Hinweis auf 5 ECTS.
// ============================================================
const MODULE_ECTS = {
  "VIK": 5,
  // "GBK": 5,
  // "GCT": 5,
  // ... weitere Module ergänzen
};

// ============================================================
// 3) STATE
// ============================================================
let selection = [];
try {
  selection = JSON.parse(localStorage.getItem("stundenplan-selection") || "[]");
} catch (e) { selection = []; }

function saveSelection() {
  try { localStorage.setItem("stundenplan-selection", JSON.stringify(selection)); } catch (e) {}
}

function toggle(id) {
  const i = selection.indexOf(id);
  if (i === -1) selection.push(id); else selection.splice(i, 1);
  saveSelection();
  render();
}

// ============================================================
// 4) RENDERING
// ============================================================
const fmt = m => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function fillSelect(el, values, labelFn) {
  el.innerHTML = values.map(v => `<option value="${esc(v)}">${esc(labelFn(v))}</option>`).join("");
}

function initControls() {
  const bereiche = [...new Set(COURSES.map(c => c.bereich).filter(Boolean))].sort();
  const stgs = [...new Set(COURSES.map(c => c.studiengang).filter(Boolean))].sort();
  fillSelect(document.getElementById("selBereich"), ["ALLE", ...bereiche],
    v => v === "ALLE" ? "Bereich: Alle" : v);
  fillSelect(document.getElementById("selStudiengang"), ["ALLE", ...stgs],
    v => v === "ALLE" ? "Studiengang: Alle" : v);
  document.getElementById("search").addEventListener("input", render);
  document.getElementById("selBereich").addEventListener("change", render);
  document.getElementById("selStudiengang").addEventListener("change", render);
  document.getElementById("clearBtn").addEventListener("click", () => { selection = []; saveSelection(); render(); });
}

function filteredCourses() {
  const q = document.getElementById("search").value.trim().toLowerCase();
  const bereich = document.getElementById("selBereich").value;
  const stg = document.getElementById("selStudiengang").value;
  return COURSES.filter(c => {
    if (bereich !== "ALLE" && c.bereich !== bereich) return false;
    if (stg !== "ALLE" && c.studiengang !== stg) return false;
    if (!q) return true;
    return [c.name, c.modul, c.teilmodul, c.kuerzel, c.vkuerzel, c.dozent, c.raum]
      .join(" ").toLowerCase().includes(q);
  });
}

function renderList() {
  const list = filteredCourses();
  document.getElementById("resultCount").textContent =
    list.length + " Treffer · Auswahl bleibt im Browser gespeichert";
  const box = document.getElementById("courseList");
  if (!list.length) { box.innerHTML = '<p class="empty">Keine Treffer</p>'; return; }
  box.innerHTML = list.map(c => {
    const sel = selection.includes(c.id);
    const meta = [c.kuerzel || c.vkuerzel, c.day ? c.tag + " " + c.zeit : (c.tag || "Termin siehe Hinweis"), c.dozent]
      .filter(Boolean).join(" · ");
    const sub = [c.bereich, c.semester ? "Semester " + c.semester : "", c.hinweis]
      .filter(Boolean).join(" · ");
    return `<button class="course-item${sel ? " selected" : ""}" data-id="${c.id}">
      <span class="checkbox">${sel ? "✓" : ""}</span>
      <span>
        <span class="ci-name">${esc(c.name || c.modul)}</span><br/>
        <span class="ci-meta">${esc(meta)}</span><br/>
        <span class="ci-sub">${esc(sub)}</span>
      </span>
    </button>`;
  }).join("");
  box.querySelectorAll(".course-item").forEach(btn =>
    btn.addEventListener("click", () => toggle(parseInt(btn.dataset.id, 10))));
}

function selectedCourses() { return COURSES.filter(c => selection.includes(c.id)); }

function renderGrid() {
  const sel = selectedCourses();
  const height = (DAY_END - DAY_START) * PX_PER_MIN;

  let head = '<div class="grid-head"><div class="time-col"></div>' +
    DAYS.map(d => `<div class="day" style="color:${DAY_COLORS[d]}">${DAY_FULL[d]}</div>`).join("") + "</div>";

  let hours = "";
  for (let m = DAY_START; m <= DAY_END; m += 60)
    hours += `<div class="hour-label" style="top:${(m - DAY_START) * PX_PER_MIN}px">${fmt(m)}</div>`;

  let dayCols = "";
  for (const d of DAYS) {
    const list = sel.filter(c => c.day === d && c.start !== null && c.end !== null)
      .sort((a, b) => a.start - b.start || a.end - b.end);
    // Überlappungen: jedem Kurs eine "Spur" (lane) innerhalb des Tages zuordnen
    const placed = [];
    for (const c of list) {
      let lane = 0;
      while (placed.some(p => p.lane === lane && p.c.end > c.start && p.c.start < c.end)) lane++;
      placed.push({ c, lane });
    }
    const lanes = placed.length ? Math.max(...placed.map(p => p.lane)) + 1 : 1;
    let blocks = "";
    for (const { c, lane } of placed) {
      const top = (c.start - DAY_START) * PX_PER_MIN + 1;
      const h = Math.max((c.end - c.start) * PX_PER_MIN - 3, 22);
      blocks += `<div class="block" style="top:${top}px;height:${h}px;left:${(lane / lanes) * 100}%;width:${(1 / lanes) * 100 - 0.6}%">
        <div class="block-inner" style="background:${DAY_COLORS[d]}" title="${esc(c.name)} – ${esc(c.dozent)} – ${esc(c.raum)}\nKlick entfernt das Fach." data-id="${c.id}">
          <div class="b-name">${esc(c.name)}</div>
          <div class="b-meta"><b>${fmt(c.start)}–${fmt(c.end)}</b>${c.dozent ? "<br/>" + esc(c.dozent) : ""}${c.raum ? "<br/>" + esc(c.raum) : ""}</div>
        </div>
      </div>`;
    }
    let lines = "";
    for (let m = DAY_START; m <= DAY_END; m += 30)
      lines += `<div class="hour-line${m % 60 !== 0 ? " half" : ""}" style="top:${(m - DAY_START) * PX_PER_MIN}px"></div>`;
    dayCols += `<div class="day-col">${lines}${blocks}</div>`;
  }

  document.getElementById("grid").innerHTML =
    head + `<div class="grid-body" style="height:${height}px"><div class="time-col">${hours}</div>${dayCols}</div>`;
  document.querySelectorAll(".block-inner").forEach(el =>
    el.addEventListener("click", () => toggle(parseInt(el.dataset.id, 10))));
}

function renderSpecial() {
  const special = selectedCourses().filter(c => !c.day || c.start === null || c.end === null);
  const box = document.getElementById("specialBox");
  const tags = document.getElementById("specialTags");
  box.hidden = special.length === 0;
  tags.innerHTML = special.map(c => {
    const meta = [c.tag || c.zeit, c.raum, c.dozent].filter(Boolean).join(" · ");
    return `<button class="special-tag" data-id="${c.id}" title="Klick entfernt das Fach">
      <b>${esc(c.name)}</b><br/>${esc(meta)}</button>`;
  }).join("");
  tags.querySelectorAll(".special-tag").forEach(el =>
    el.addEventListener("click", () => toggle(parseInt(el.dataset.id, 10))));
}

function renderStats() {
  const sel = selectedCourses();
  const sws = sel.reduce((s, c) => s + (parseFloat(c.sws) || 0), 0);
  // ECTS: pro Modul nur EINMAL zählen (Schlüssel = Modulkürzel,
  // sonst Veranstaltungskürzel). Nur Module mit hinterlegtem Wert.
  const counted = new Set();
  let ects = 0;
  let missing = new Set();
  for (const c of sel) {
    const key = c.kuerzel || c.vkuerzel || c.name;
    if (counted.has(key)) continue;
    counted.add(key);
    if (MODULE_ECTS[key] !== undefined) ects += MODULE_ECTS[key];
    else missing.add(key);
  }
  document.getElementById("countPill").textContent = sel.length + " Veranstaltungen";
  document.getElementById("swsPill").textContent = sws + " SWS";
  const ectsEl = document.getElementById("ectsPill");
  ectsEl.textContent = ects + " ECTS";
  if (missing.size > 0) {
    ectsEl.textContent = ects + " ECTS (" + missing.size + " Module ohne Angabe)";
  }
  document.getElementById("clearBtn").hidden = sel.length === 0;
  document.getElementById("placeholder").style.display = sel.length === 0 ? "block" : "none";
}

function render() {
  renderList();
  renderGrid();
  renderSpecial();
  renderStats();
}

initControls();
render();
