#Client Side Unsicherheiten
1. email adresse wird nicht auf format überprüft
2. email wird nur am client überprüft (Burp suite kann email verändern/löschen)
3. Comment hinzufügen: HTML injection möglich
4. (TO DO) Beim laden der webseite sind die Email Adressen der vorhandenen Kommentare anonym, aber im Log/HTML/etc. (irgendwo) auffindbar


#Server Side
1. (TO DO) Path treversal
2. (TO DO) Remote Server execution