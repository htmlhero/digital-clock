# Digital Clock

Clock application for Smart TV.

## Installation

First of all clone the repo.

Then from project root run:
```sh
npm install
```

Build application for Samsung:
```sh
npm run build:samsung
```

Serve Samsung application:
```sh
sudo npm run deploy:samsung
```

### For Samsung Smart TV H-series (year 2014)

1. Login under "developer"
	1. Press **Menu** remote button (or Misc button on touch remote and select Menu button on the screen).
	2. Select **Smart Hub** -\> **Samsung Account** -\> **Login**
		* **Login:** develop
		* **Password:** 11111111
	3. Press **Log In**.
2. Add IP
	1. Press the **Smart hub** remote button.
	2. Select screen button leading to full Smart Hub.
	3. Select any existing app and hold **OK** remote button until new menu comes.
	4. Select **IP Setting**.
	5. Enter IP.
	6. Select any existing app and hold **OK** remote button until new menu comes.
	7. Select **Start User App Sync**.

### For Samsung Smart TV F-series (year 2013)

1. Login under "developer"
	1. Press **Smart hub** remote button.
	2. Press **Menu** remote button (or Misc button on touch remote and select Menu button on the screen).
	3. Select **Smart Features** -\> **Samsung Account** -\> **Log In**
		* **Login:** develop
		* **Password:** sso1029dev!
	4. Check **Remember my password**.
	5. Press **Log In**.
2. Add IP
	1. Press the **Smart hub** remote button.
	2. Select **More Apps**.
	3. Select **Options** in the top right corner of the screen.
	4. Select **IP Setting**.
	5. Enter IP.
	6. Select **Options** -\> **Start App Sync**.

### For Samsung Smart TV E-series (year 2012)

1. Login under "developer"
	1. Press **Smart hub** remote button.
	2. Press **red (A)** remote button.
		* **Login:** develop
		* **Password:** 111111
2. Add IP
	1. Press **Tools** remote button.
	2. Select **Settings**.
	3. Select **Development**.
	4. Select checkbox and press **OK**.
	5. Select **IP Setting**.
	6. Enter IP.
	7. Select **User Application Synchronization**.
	8. After app downloading restart your Smart TV.

## License

Project licensed under MIT licence. Please read LICENSE file.

Also in project used [Digital-7](http://www.styleseven.com/php/get_product.php?product=Digital-7) font, created by Style-7 company.
Font have other license. For more information, please visit [www.styleseven.com](http://www.styleseven.com).
