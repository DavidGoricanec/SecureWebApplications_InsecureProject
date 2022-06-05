# Client Side Unsicherheiten
1. email adresse wird nicht auf format überprüft
2. email wird nur am client überprüft (Burp suite kann email verändern/löschen)
3. Comment hinzufügen: HTML injection möglich
4. Beim laden der webseite sind die Email Adressen der vorhandenen Kommentare anonym, aber im Log auffindbar
5. Entries mit Strichpunkten oder Zeilenumbrüchen brechen das System


# Server Side
1. Path treversal
2. Session highjacking, random string + counter integer; random string für alle gleich
3. Alle Errormeldungen werden 1:1 an den Client übermittelt
4. Keine Inputvalidierungen
3. (TO DO) Remote Server execution


# NPM audit report

hosted-git-info  <2.8.9
Severity: moderate
Regular Expression Denial of Service in hosted-git-info - https://github.com/advisories/GHSA-43f8-2h32-f4cj
fix available via `npm audit fix`
node_modules/hosted-git-info

marked  <=4.0.9
Severity: high
Regular Expression Denial of Service in marked - https://github.com/advisories/GHSA-ch52-vgq2-943f
Inefficient Regular Expression Complexity in marked - https://github.com/advisories/GHSA-5v2h-r2cx-5xgj
fix available via `npm audit fix`
node_modules/marked
  cli-usage  *
  Depends on vulnerable versions of marked
  node_modules/cli-usage
    node-notifier  <=8.0.0
    Depends on vulnerable versions of cli-usage
    node_modules/node-notifier
      ts-node-dev  <=1.0.0-pre.66
      Depends on vulnerable versions of node-notifier
      node_modules/ts-node-dev

minimist  <=1.2.5
Severity: critical
Prototype Pollution in minimist - https://github.com/advisories/GHSA-xvch-5gv4-984h
Prototype Pollution in minimist - https://github.com/advisories/GHSA-vh95-rmgr-6w4m
Prototype Pollution in minimist - https://github.com/advisories/GHSA-vh95-rmgr-6w4m
fix available via `npm audit fix`
node_modules/minimist
node_modules/mkdirp/node_modules/minimist
  mkdirp  0.4.1 - 0.5.1
  Depends on vulnerable versions of minimist
  node_modules/mkdirp

node-notifier  <=8.0.0
Severity: high
OS Command Injection in node-notifier - https://github.com/advisories/GHSA-5fw9-fq32-wv5p
Depends on vulnerable versions of cli-usage
fix available via `npm audit fix`
node_modules/node-notifier
  ts-node-dev  <=1.0.0-pre.66
  Depends on vulnerable versions of node-notifier
  node_modules/ts-node-dev

path-parse  <1.0.7
Severity: moderate
Regular Expression Denial of Service in path-parse - https://github.com/advisories/GHSA-hj48-42vr-x3v9
fix available via `npm audit fix`
node_modules/path-parse

trim-newlines  <3.0.1
Severity: high
Uncontrolled Resource Consumption in trim-newlines - https://github.com/advisories/GHSA-7p7h-4mm5-852v
fix available via `npm audit fix`
node_modules/trim-newlines
  meow  3.4.0 - 5.0.0
  Depends on vulnerable versions of trim-newlines
  node_modules/meow

10 vulnerabilities (4 moderate, 5 high, 1 critical)
