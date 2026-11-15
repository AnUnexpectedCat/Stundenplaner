# Stundenplaner
Als ein Kursprojekt erstelle ich einen webbasierten Stundenplaner. Mit diesem soll es einfacher werden, seine gewünschten Kurse zu suchen nach unterschiedlichen Kategorien zu filtern und damit seinen Stundenplan zu erstellen.<br> <br>
! Noch in der Entwicklung.<br> 
Bekannte Fehler: <br>
X
<img width="1917" height="970" alt="grafik" src="https://github.com/user-attachments/assets/e60500af-89e6-4a98-b09a-3e2226c3e9f7" />


# Benutzeranleitung (für die Fachschaft D)
Momentan sind nur die Kurse für das WiSe 26 der Fakultät für Gestaltung an der Technischen Hochschule Mannheim, eingetragen. Hier nun eine Anleitung, mit welcher der Planer aktualisiert und Fehler im Modulhandbuch korrigiert werden können.<br><br><br>

1. Habt ihr den neuen Stundenplan als PDF, muss dieser in eine richtige Tabelle umgewandelt werden. Gebt die PDF der KI eures Misstrauens mit folgendem Prompt: <br>
Extrahiere die Kursinformationen aus dem gegebenen PDF und gib sie mir TAB-limitiert in einem File aus. <br>
Ihr solltet eine .tsv-Datei erhalten <br> <br>

2. Um diese Datei in den Planer zu integrieren, benötigt ihr Zugriff auf das Google Sheet, welches die Daten aus der TSV‑Datei enthält:<br>
https://docs.google.com/spreadsheets/d/1n85p31XI20IxhgmjMfb41r1_DwiEJtwXV8PjZ-g6rqc/edit?usp=sharing   <br>
Kontaktiert mich bitte um unter fachschaftdthm@gmail.com oder stella.urbach@t-online.de damit ich euch Mitarbeiterrechte geben kann. <br><br>

3. Kopiert alles aus der TSV‑Datei und fügt sie im Feld A1 mit Strg V/Command V ein. Google Sheets sollte die Bereiche automatisch aufgeteilt haben. Ist das nicht der Fall, markiert Spalte A1 und geht über „Daten“ auf „Text in Spalten aufteilen“ oder löscht alles und probiert es nochmal. <br><br>

4. Löscht nun die zweite Zeile, die „Studienjahr“ heißt. In ihr ist nur das aktuelle Semester angegeben, z.B. „Wintersemester 2026/27“, welches der Planer nie braucht. 
Die Reihenfolge sollte mit dieser identisch sein, sonst kann das Programm eure Daten nicht richtig lesen

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Studiengang | Bereich | Modul | Modulkürzel | Teilmodul | Veranstaltungskürzel | Kürzel alt | SWS | Tag / Termin | Zeit | Lehrveranstaltung | Raum / Ort | Dozent:in | Semester |
<br><br>

5. Fertig! Nach einigen Minuten sollte GitHub den neuen Plan erkannt haben. Ladet die Website einfach neu. Am Code muss nichts geändert werden. <br>
Hier der Link: 
https://anunexpectedcat.github.io/Stundenplaner/ <br>
(Web Adresse wird noch angepasst :,))
