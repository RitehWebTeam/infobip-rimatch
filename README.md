# Dating Aplikacija-rimatch
## Opis
Web aplikacija služi za upoznavanje novih ljudi. Korisnik kreira svoj profil gdje unosi svoje podatke i interese gdje ga naš algoritam spaja sa ljudima koji odgovarajau njegovim preferencama. Kada se dvoje ljudi "matcha" na korisnikov mobilni uređaj se šalje SMS/Whatsapp poruka putem Infobipovog API-a.

Korisničko sučelje omogućuje korisniku da kreira i uređuje svoj profil. Omogućuje prikaz potencijalnih korisnika koji se korisniku mogu sviđati.  Korisnku moze "lajkat" ili preskočiti potencijalnog korisnika ovisno o tome je li on za njega zainteresiran ili nije.  Frontend dio će biti razvijen u React javascript knjižnici uz korištenje tailwinda-a. Backend dio će biti izrađen u Java Spring Boot framwork-u sa MongoDB bazom podataka. Bazu podatak koristimo za spremanje korisničkih profila. Backend koristi Infobipov API za slanje poruka.

## Lista funkcionalnosti
- Kreiranje korisničkog profila
	- Pri registraciji korisnik upisuje svoje Ime i prezime, spol, datum rođenja, email, lozinka
	- Nakon uspješne prve prijave korisnik specificira svoje preference (spol, raspon godina, opis, sliku profila)
	- Korisnik specificira gdje želi biti obavješten kada se nađe "Match" (preko SMS-a ili preko WhatsApp Poruke)
- "Match-anje" Korisnika
	- Algoritam koji korisniku preporučuje potencijalne partnere s obziom na njegove preference
	- Pri prikazu potencijalnog partnera, korisnik može pregledati detaljno njegov profil pritiskom na gumb "details" 
	- Korisnik izabire sviđa li mu se partner pritiskom na gumb "like" ili ga može preskočiti pritiskom na gumb "skip"
- Uređivanje profila
	- Korisnik će u svakom trenutku moći urediti svoje podatke na profilu
	- Ima mogućnost izmjene svojih preferenci i uređivanje svojih slika.
- Autentifikacija
	- Korištenjem JWT tokena


