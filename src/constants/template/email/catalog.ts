export type EmailTemplateOption = {
	id: string;
	name: string;
	html: string;
	defaultData: Record<string, unknown>;
};

const elegantCss = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Lato',sans-serif;background:__BODY_GRADIENT__;min-height:100vh;padding:20px;display:flex;align-items:center;justify-content:center}
.invitation{max-width:500px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.25);position:relative}
.invitation::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb,#ff9ff3)}
.header{background:__HEADER_GRADIENT__;color:white;text-align:center;padding:60px 40px 40px;position:relative;overflow:hidden}
.header::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');animation:float 20s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(1deg)}}
.save-date{font-size:14px;letter-spacing:3px;text-transform:uppercase;opacity:.9;margin-bottom:20px;position:relative;z-index:1}
.couple-names{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;margin:20px 0;position:relative;z-index:1;text-shadow:0 2px 4px rgba(0,0,0,0.1)}
.ampersand{font-size:24px;opacity:.8;margin:0 10px;font-style:italic}
.content{padding:50px 40px;text-align:center;background:#ffffff}
.invitation-text{font-size:18px;color:#555;line-height:1.8;margin-bottom:40px;font-weight:300}
.event-details{background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);border-radius:15px;padding:35px;margin:30px 0;border:1px solid #dee2e6}
.detail-row{display:flex;justify-content:space-between;align-items:center;margin:20px 0;padding:15px 0;border-bottom:1px solid #e9ecef}
.detail-row:last-child{border-bottom:none}
.detail-label{font-weight:400;color:#6c757d;text-transform:uppercase;letter-spacing:1px;font-size:12px}
.detail-value{font-weight:400;color:#2c3e50;font-size:16px;text-align:right}
.venue-name{font-weight:600;color:#2c3e50}
.rsvp-section{background:__RSVP_GRADIENT__;color:white;padding:35px;border-radius:15px;margin:30px 0;text-align:center}
.rsvp-title{font-family:'Playfair Display',serif;font-size:24px;margin-bottom:15px}
.rsvp-details{font-size:14px;opacity:.9;line-height:1.6}
.rsvp-contact{background:rgba(255,255,255,0.1);border-radius:10px;padding:20px;margin-top:20px;backdrop-filter:blur(10px)}
.footer{text-align:center;padding:30px 40px;background:#f8f9fa;color:#6c757d;font-size:14px;font-style:italic}
.decorative-line{width:60px;height:2px;background:__LINE_GRADIENT__;margin:20px auto;border-radius:1px}
.accept-button{display:inline-block;margin-top:25px;padding:15px 40px;background:#ffffff;color:__BTN_COLOR__;text-decoration:none;border-radius:50px;font-weight:600;font-size:16px;transition:all .3s ease;box-shadow:0 4px 15px rgba(0,0,0,.2)}
.accept-button:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.3);background:#f8f9fa}
@media (max-width:600px){body{padding:10px}.header{padding:40px 30px 30px}.couple-names{font-size:32px}.content{padding:40px 30px}.event-details{padding:25px}.detail-row{flex-direction:column;text-align:center;gap:10px}.detail-value{text-align:center}}
</style>
`;

function buildElegantTemplate(headerTitleHtml: string, detailRowsHtml: string, quoteOrFooter: string): string {
	return `<!DOCTYPE html><html lang="es"><head>
	<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400&display=swap" rel="stylesheet">
	<title>Invitación</title>${elegantCss}
</head><body>
	<div class="invitation">
		<div class="header">
			<div class="save-date">Save the Date</div>
			<div class="couple-names">${headerTitleHtml}</div>
		</div>
		<div class="content">
			<p class="invitation-text">Con gran alegría, te invitamos a acompañarnos en esta ocasión especial.</p>
			<div class="decorative-line"></div>
			<div class="event-details">${detailRowsHtml}</div>
			<div class="rsvp-section">
				<div class="rsvp-title">Confirma tu Asistencia</div>
				<p class="rsvp-details">Por favor confirma tu asistencia a la brevedad.</p>
				{{if .AcceptURL}}<a href="{{.AcceptURL}}" class="accept-button">Confirmar Asistencia</a>{{end}}
				<div class="rsvp-contact">
					<div style="margin-bottom:10px;"><strong>Email:</strong> {{.ContactEmail}}</div>
					<div><strong>WhatsApp:</strong> {{.ContactPhone}}</div>
				</div>
			</div>
			<div class="decorative-line"></div>
		</div>
		<div class="footer">${quoteOrFooter}</div>
	</div>
</body></html>`;
}

export const EMAIL_TEMPLATES: EmailTemplateOption[] = [
	{
		id: 'wedding-elegant',
		name: 'Boda • Elegante',
		html: buildElegantTemplate(
			'{{.WifeName}} <span class="ampersand">&</span> {{.HusbandName}}',
			`
			<div class="detail-row"><span class="detail-label">Fecha</span><span class="detail-value">{{.EventDate}}</span></div>
			<div class="detail-row"><span class="detail-label">Ceremonia</span><span class="detail-value">{{.CeremonyTime}}</span></div>
			<div class="detail-row"><span class="detail-label">Recepción</span><span class="detail-value">{{.ReceptionTime}}</span></div>
			<div class="detail-row"><span class="detail-label">Lugar</span>
				<div class="detail-value"><div class="venue-name">{{.VenueName}}</div>
				<div style="font-size:14px;color:#6c757d;margin-top:5px;">{{.VenueAddress}}</div></div>
			</div>
			<div class="detail-row"><span class="detail-label">Código de Vestimenta</span><span class="detail-value">{{.DressCode}}</span></div>
			`,
			'"El amor no se mira, se siente."',
		),
		defaultData: {
			WifeName: 'Isabella',
			HusbandName: 'Alessandro',
			EventDate: 'Sábado, 15 de Junio 2024',
			CeremonyTime: '5:00 PM',
			ReceptionTime: '7:00 PM',
			VenueName: 'Hacienda San Miguel',
			VenueAddress: 'Av. de los Rosales 123, Ciudad de México',
			DressCode: 'Formal / Cocktail',
			AcceptURL: 'https://ejemplo.com/confirmar',
			ContactEmail: 'boda@ejemplo.com',
			ContactPhone: '+52 55 1234 5678',
		},
	},
	{
		id: 'birthday-elegant',
		name: 'Cumpleaños • Elegante',
		html: buildElegantTemplate(
			'¡{{.PersonName}} cumple {{.Age}}!',
			`
			<div class="detail-row"><span class="detail-label">Fecha</span><span class="detail-value">{{.EventDate}}</span></div>
			<div class="detail-row"><span class="detail-label">Hora</span><span class="detail-value">{{.EventTime}}</span></div>
			<div class="detail-row"><span class="detail-label">Lugar</span>
				<div class="detail-value"><div class="venue-name">{{.VenueName}}</div>
				<div style="font-size:14px;color:#6c757d;margin-top:5px;">{{.VenueAddress}}</div></div>
			</div>
			<div class="detail-row"><span class="detail-label">Sugerencia de Regalo</span><span class="detail-value">{{.GiftHint}}</span></div>
			`,
			'¡Te esperamos para celebrar juntos!',
		),
		defaultData: {
			PersonName: 'Sofía',
			Age: '8',
			EventDate: 'Sábado, 22 de Junio 2024',
			EventTime: '4:00 PM',
			VenueName: 'Salón Arcoíris',
			VenueAddress: 'Calle Fiesta 45, CDMX',
			GiftHint: 'Tu presencia es el mejor regalo',
			AcceptURL: 'https://ejemplo.com/rsvp',
			ContactEmail: 'cumple@ejemplo.com',
			ContactPhone: '+52 55 0000 0000',
		},
	},
	{
		id: 'quinceanera-elegant',
		name: 'Quinceañera • Elegante',
		html: buildElegantTemplate(
			'Mis XV de {{.PersonName}}',
			`
			<div class="detail-row"><span class="detail-label">Fecha</span><span class="detail-value">{{.EventDate}}</span></div>
			<div class="detail-row"><span class="detail-label">Misa</span><span class="detail-value">{{.CeremonyTime}}</span></div>
			<div class="detail-row"><span class="detail-label">Recepción</span><span class="detail-value">{{.ReceptionTime}}</span></div>
			<div class="detail-row"><span class="detail-label">Lugar</span>
				<div class="detail-value"><div class="venue-name">{{.VenueName}}</div>
				<div style="font-size:14px;color:#6c757d;margin-top:5px;">{{.VenueAddress}}</div></div>
			</div>
			<div class="detail-row"><span class="detail-label">Dress Code</span><span class="detail-value">{{.DressCode}}</span></div>
			`,
			'Gracias por compartir conmigo este día especial.',
		),
		defaultData: {
			PersonName: 'Valentina',
			EventDate: 'Sábado, 10 de Agosto 2024',
			CeremonyTime: '5:00 PM',
			ReceptionTime: '7:30 PM',
			VenueName: 'Salón Real',
			VenueAddress: 'Av. Princesa 100, CDMX',
			DressCode: 'Formal',
			AcceptURL: 'https://ejemplo.com/valentina-xv',
			ContactEmail: 'xv@ejemplo.com',
			ContactPhone: '+52 55 2222 3333',
		},
	},
	{
		id: 'corporate-elegant',
		name: 'Evento Corporativo • Elegante',
		html: buildElegantTemplate(
			'{{.EventTitle}}',
			`
			<div class="detail-row"><span class="detail-label">Fecha</span><span class="detail-value">{{.EventDate}}</span></div>
			<div class="detail-row"><span class="detail-label">Hora</span><span class="detail-value">{{.EventTime}}</span></div>
			<div class="detail-row"><span class="detail-label">Sede</span>
				<div class="detail-value"><div class="venue-name">{{.VenueName}}</div>
				<div style="font-size:14px;color:#6c757d;margin-top:5px;">{{.VenueAddress}}</div></div>
			</div>
			<div class="detail-row"><span class="detail-label">Código de Vestimenta</span><span class="detail-value">{{.DressCode}}</span></div>
			`,
			'© {{.Year}} {{.CompanyName}}',
		),
		defaultData: {
			EventTitle: 'Networking & Product Launch',
			EventDate: 'Jueves, 11 de Julio 2024',
			EventTime: '6:30 PM',
			VenueName: 'Centro de Convenciones',
			VenueAddress: 'Av. Reforma 250, CDMX',
			DressCode: 'Business Casual',
			CompanyName: 'Festa Nova Co.',
			Year: new Date().getFullYear(),
			AcceptURL: 'https://empresa.com/confirmar',
			ContactEmail: 'eventos@empresa.com',
			ContactPhone: '+52 55 4444 5555',
		},
	},
];


