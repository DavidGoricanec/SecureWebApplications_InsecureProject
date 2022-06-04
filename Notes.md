#Client Side Unsicherheiten
1. email adresse wird nicht auf format überprüft
2. email wird nur am client überprüft (Burp suite kann email verändern/löschen)
3. Comment hinzufügen: HTML injection möglich
4. Beim laden der webseite sind die Email Adressen der vorhandenen Kommentare anonym, aber im Log auffindbar
5. Entries mit Strichpunkten oder Zeilenumbrüchen brechen das System


#Server Side
1. Path treversal
2. (TO DO) Remote Server execution
3. (Idee) Session highjacking, random string + counter integer; random string für alle gleich 