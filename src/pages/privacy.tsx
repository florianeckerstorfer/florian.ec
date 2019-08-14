import React, { ReactElement } from 'react';

import Content from '../components/Content/Content';
import H1 from '../components/H1/H1';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';

const PrivacyPage: React.FC = (): ReactElement => (
  <Layout>
    <SEO
      title="Privacy Policy"
      keywords={[
        'florian eckerstorfer',
        'web developer',
        'software developer',
        'privacy policy',
      ]}
    />
    <H1>Privay Policy </H1>

    <Content>
      <ul>
        <li>
          This privacy policy applies to all my websites:{' '}
          <a href="https://florian.ec">florian.ec</a>,{' '}
          <a href="http://👏🏻.ws">👏🏻.ws</a>, <a href="http://👋🏻.ws">👋🏻.ws</a>,{' '}
          <a href="https://webadventures.at">webadventures.at</a>
        </li>
        <li>My websites do not use cookies.</li>
        <li>
          My websites do not embed code, videos, images or fonts from other
          websites.
        </li>
        <li>My websites are hosted at Digital Ocean in Amsterdam, Europe.</li>
        <li>
          My server keeps logs (which include your IP address), these are
          deleted after 30 days.{' '}
        </li>
      </ul>

      <h2>Datenschutzerklärung</h2>

      <p>
        Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck
        der Verarbeitung von personenbezogenen Daten (nachfolgend kurz „Daten“)
        innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten,
        Funktionen und Inhalte sowie externen Onlinepräsenzen, wie z.B. unser
        Social Media Profile auf (nachfolgend gemeinsam bezeichnet als
        „Onlineangebot“). Im Hinblick auf die verwendeten Begrifflichkeiten, wie
        z.B. „Verarbeitung“ oder „Verantwortlicher“ verweisen wir auf die
        Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
      </p>

      <h3>Verantwortlicher</h3>

      <ul>
        <li>Florian Eckerstorfer</li>
        <li>Tigergasse 4</li>
        <li>1080 Wien, Österreich</li>
        <li>E-Mailadresse: florian@eckerstorfer.net</li>
      </ul>

      <h3>Arten der verarbeiteten Daten:</h3>

      <ul>
        <li>
          Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten,
          Zugriffszeiten).
        </li>
        <li>
          Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen).
        </li>
      </ul>

      <h3>Kategorien betroffener Personen</h3>
      <p>
        Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die
        betroffenen Personen zusammenfassend auch als „Nutzer“).
      </p>

      <h3>Zweck der Verarbeitung</h3>
      <ul>
        <li>
          Zurverfügungstellung des Onlineangebotes, seiner Funktionen und
          Inhalte.
        </li>
        <li>Sicherheitsmaßnahmen.</li>
        <li>Reichweitenmessung</li>
      </ul>

      <h3>Verwendete Begrifflichkeiten</h3>
      <p>
        „Personenbezogene Daten“ sind alle Informationen, die sich auf eine
        identifizierte oder identifizierbare natürliche Person (im Folgenden
        „betroffene Person“) beziehen; als identifizierbar wird eine natürliche
        Person angesehen, die direkt oder indirekt, insbesondere mittels
        Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu
        Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder
        mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck
        der physischen, physiologischen, genetischen, psychischen,
        wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen
        Person sind.
      </p>
      <p>
        „Verarbeitung“ ist jeder mit oder ohne Hilfe automatisierter Verfahren
        ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit
        personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch
        jeden Umgang mit Daten.
      </p>
      <p>
        „Pseudonymisierung“ die Verarbeitung personenbezogener Daten in einer
        Weise, dass die personenbezogenen Daten ohne Hinzuziehung zusätzlicher
        Informationen nicht mehr einer spezifischen betroffenen Person
        zugeordnet werden können, sofern diese zusätzlichen Informationen
        gesondert aufbewahrt werden und technischen und organisatorischen
        Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen
        Daten nicht einer identifizierten oder identifizierbaren natürlichen
        Person zugewiesen werden.
      </p>
      <p>
        „Profiling“ jede Art der automatisierten Verarbeitung personenbezogener
        Daten, die darin besteht, dass diese personenbezogenen Daten verwendet
        werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche
        Person beziehen, zu bewerten, insbesondere um Aspekte bezüglich
        Arbeitsleistung, wirtschaftliche Lage, Gesundheit, persönliche
        Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder
        Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.
      </p>
      <p>
        Als „Verantwortlicher“ wird die natürliche oder juristische Person,
        Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit
        anderen über die Zwecke und Mittel der Verarbeitung von
        personenbezogenen Daten entscheidet, bezeichnet.
      </p>
      <p>
        „Auftragsverarbeiter“ eine natürliche oder juristische Person, Behörde,
        Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag
        des Verantwortlichen verarbeitet.
      </p>
      <h3>Maßgebliche Rechtsgrundlagen</h3>
      <p>
        Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen
        unserer Datenverarbeitungen mit. Sofern die Rechtsgrundlage in der
        Datenschutzerklärung nicht genannt wird, gilt Folgendes: Die
        Rechtsgrundlage für die Einholung von Einwilligungen ist Art. 6 Abs. 1
        lit. a und Art. 7 DSGVO, die Rechtsgrundlage für die Verarbeitung zur
        Erfüllung unserer Leistungen und Durchführung vertraglicher Maßnahmen
        sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO, die
        Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer rechtlichen
        Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO, und die Rechtsgrundlage
        für die Verarbeitung zur Wahrung unserer berechtigten Interessen ist
        Art. 6 Abs. 1 lit. f DSGVO. Für den Fall, dass lebenswichtige Interessen
        der betroffenen Person oder einer anderen natürlichen Person eine
        Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6
        Abs. 1 lit. d DSGVO als Rechtsgrundlage.
      </p>
      <h4>Sicherheitsmaßnahmen</h4>
      <p>
        Wir treffen nach Maßgabe des Art. 32 DSGVO unter Berücksichtigung des
        Stands der Technik, der Implementierungskosten und der Art, des Umfangs,
        der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen
        Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und
        Freiheiten natürlicher Personen, geeignete technische und
        organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau
        zu gewährleisten.
      </p>
      <p>
        Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit,
        Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen
        Zugangs zu den Daten, als auch des sie betreffenden Zugriffs, der
        Eingabe, Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung.
        Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von
        Betroffenenrechten, Löschung von Daten und Reaktion auf Gefährdung der
        Daten gewährleisten. Ferner berücksichtigen wir den Schutz
        personenbezogener Daten bereits bei der Entwicklung, bzw. Auswahl von
        Hardware, Software sowie Verfahren, entsprechend dem Prinzip des
        Datenschutzes durch Technikgestaltung und durch datenschutzfreundliche
        Voreinstellungen (Art. 25 DSGVO).
      </p>
      <h3>Zusammenarbeit mit Auftragsverarbeitern und Dritten</h3>
      <p>
        Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen
        Personen und Unternehmen (Auftragsverarbeitern oder Dritten) offenbaren,
        sie an diese übermitteln oder ihnen sonst Zugriff auf die Daten
        gewähren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis
        (z.B. wenn eine Übermittlung der Daten an Dritte, wie an
        Zahlungsdienstleister, gem. Art. 6 Abs. 1 lit. b DSGVO zur
        Vertragserfüllung erforderlich ist), Sie eingewilligt haben, eine
        rechtliche Verpflichtung dies vorsieht oder auf Grundlage unserer
        berechtigten Interessen (z.B. beim Einsatz von Beauftragten, Webhostern,
        etc.).
      </p>
      <p>
        Sofern wir Dritte mit der Verarbeitung von Daten auf Grundlage eines
        sog. „Auftragsverarbeitungsvertrages“ beauftragen, geschieht dies auf
        Grundlage des Art. 28 DSGVO.
      </p>
      <h3>Übermittlungen in Drittländer</h3>
      <p>
        Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen
        Union (EU) oder des Europäischen Wirtschaftsraums (EWR)) verarbeiten
        oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder
        Offenlegung, bzw. Übermittlung von Daten an Dritte geschieht, erfolgt
        dies nur, wenn es zur Erfüllung unserer (vor)vertraglichen Pflichten,
        auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen
        Verpflichtung oder auf Grundlage unserer berechtigten Interessen
        geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse,
        verarbeiten oder lassen wir die Daten in einem Drittland nur beim
        Vorliegen der besonderen Voraussetzungen der Art. 44 ff. DSGVO
        verarbeiten. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer
        Garantien, wie der offiziell anerkannten Feststellung eines der EU
        entsprechenden Datenschutzniveaus (z.B. für die USA durch das „Privacy
        Shield“) oder Beachtung offiziell anerkannter spezieller vertraglicher
        Verpflichtungen (so genannte „Standardvertragsklauseln“).
      </p>
      <h3>Rechte der betroffenen Personen</h3>
      <p>
        Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
        betreffende Daten verarbeitet werden und auf Auskunft über diese Daten
        sowie auf weitere Informationen und Kopie der Daten entsprechend Art. 15
        DSGVO.
      </p>
      <p>
        Sie haben entsprechend. Art. 16 DSGVO das Recht, die Vervollständigung
        der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden
        unrichtigen Daten zu verlangen.
      </p>
      <p>
        Sie haben nach Maßgabe des Art. 17 DSGVO das Recht zu verlangen, dass
        betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach
        Maßgabe des Art. 18 DSGVO eine Einschränkung der Verarbeitung der Daten
        zu verlangen.
      </p>
      <p>
        Sie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die
        Sie uns bereitgestellt haben nach Maßgabe des Art. 20 DSGVO zu erhalten
        und deren Übermittlung an andere Verantwortliche zu fordern.
      </p>

      <p>
        Sie haben ferner gem. Art. 77 DSGVO das Recht, eine Beschwerde bei der
        zuständigen Aufsichtsbehörde einzureichen. ### Widerrufsrecht Sie haben
        das Recht, erteilte Einwilligungen gem. Art. 7 Abs. 3 DSGVO mit Wirkung
        für die Zukunft zu widerrufen
      </p>
      <h3>Widerspruchsrecht</h3>
      <p>
        Sie können der künftigen Verarbeitung der Sie betreffenden Daten nach
        Maßgabe des Art. 21 DSGVO jederzeit widersprechen. Der Widerspruch kann
        insbesondere gegen die Verarbeitung für Zwecke der Direktwerbung
        erfolgen.
      </p>

      <h3>Löschung von Daten</h3>
      <p>
        Die von uns verarbeiteten Daten werden nach Maßgabe der Art. 17 und 18
        DSGVO gelöscht oder in ihrer Verarbeitung eingeschränkt. Sofern nicht im
        Rahmen dieser Datenschutzerklärung ausdrücklich angegeben, werden die
        bei uns gespeicherten Daten gelöscht, sobald sie für ihre
        Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine
        gesetzlichen Aufbewahrungspflichten entgegenstehen. Sofern die Daten
        nicht gelöscht werden, weil sie für andere und gesetzlich zulässige
        Zwecke erforderlich sind, wird deren Verarbeitung eingeschränkt. D.h.
        die Daten werden gesperrt und nicht für andere Zwecke verarbeitet. Das
        gilt z.B. für Daten, die aus handels- oder steuerrechtlichen Gründen
        aufbewahrt werden müssen.
      </p>

      <p>
        Nach gesetzlichen Vorgaben in Deutschland, erfolgt die Aufbewahrung
        insbesondere für 10 Jahre gemäß §§ 147 Abs. 1 AO, 257 Abs. 1 Nr. 1 und
        4, Abs. 4 HGB (Bücher, Aufzeichnungen, Lageberichte, Buchungsbelege,
        Handelsbücher, für Besteuerung relevanter Unterlagen, etc.) und 6 Jahre
        gemäß § 257 Abs. 1 Nr. 2 und 3, Abs. 4 HGB (Handelsbriefe).
      </p>

      <p>
        Nach gesetzlichen Vorgaben in Österreich erfolgt die Aufbewahrung
        insbesondere für 7 J gemäß § 132 Abs. 1 BAO (Buchhaltungsunterlagen,
        Belege/Rechnungen, Konten, Belege, Geschäftspapiere, Aufstellung der
        Einnahmen und Ausgaben, etc.), für 22 Jahre im Zusammenhang mit
        Grundstücken und für 10 Jahre bei Unterlagen im Zusammenhang mit
        elektronisch erbrachten Leistungen, Telekommunikations-, Rundfunk- und
        Fernsehleistungen, die an Nichtunternehmer in EU-Mitgliedstaaten
        erbracht werden und für die der Mini-One-Stop-Shop (MOSS) in Anspruch
        genommen wird.
      </p>

      <h3>Hosting und E-Mail-Versand</h3>

      <p>
        Die von uns in Anspruch genommenen Hosting-Leistungen dienen der
        Zurverfügungstellung der folgenden Leistungen: Infrastruktur- und
        Plattformdienstleistungen, Rechenkapazität, Speicherplatz,
        Sicherheitsleistungen sowie technische Wartungsleistungen, die wir zum
        Zwecke des Betriebs dieses Onlineangebotes einsetzen.
      </p>
      <p>
        Hierbei verarbeiten wir, bzw. unser Hostinganbieter Nutzungsdaten, Meta-
        und Kommunikationsdaten von Kunden, Interessenten und Besuchern dieses
        Onlineangebotes auf Grundlage unserer berechtigten Interessen an einer
        effizienten und sicheren Zurverfügungstellung dieses Onlineangebotes
        gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss
        Auftragsverarbeitungsvertrag).
      </p>

      <h3>Erhebung von Zugriffsdaten und Logfiles</h3>

      <p>
        Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer
        berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten
        über jeden Zugriff auf den Server, auf dem sich dieser Dienst befindet
        (sogenannte Serverlogfiles). Zu den Zugriffsdaten gehören Name der
        abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, übertragene
        Datenmenge, Meldung über erfolgreichen Abruf, Browsertyp nebst Version,
        das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite),
        IP-Adresse und der anfragende Provider.
      </p>
      <p>
        Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur Aufklärung
        von Missbrauchs- oder Betrugshandlungen) für die Dauer von maximal 30
        Tagen gespeichert und danach gelöscht. Daten, deren weitere Aufbewahrung
        zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des
        jeweiligen Vorfalls von der Löschung ausgenommen.
      </p>
      <p>
        <a href="https://datenschutz-generator.de/">
          Erstellt mit Datenschutz-Generator.de von RA Dr. Thomas Schwenke
        </a>
      </p>
    </Content>
  </Layout>
);

export default PrivacyPage;
