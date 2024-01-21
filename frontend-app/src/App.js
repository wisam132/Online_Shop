import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Kleidung,
  Geraete,
  KundenDaten,
  Moebel,

  Warenkorb,
  KundenProdukte,
  Home,
  View,
  ViewSuche,
} from "./Kunde/index";
import {
  KundenLogin,
  KundenRegistrieren,
  AdminRegistrieren,
} from "./CreateAccount/index";
import { Header, Footer, AdminHeader } from "./Section/index";

import { Container } from "./Compunent/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import {
  AdminProdukteVerwalten,
  AdminProdukteUpdate,
  AdminKleidungErstellen,
  AdminKundenDatenVerwalten,
  AdminGeraeteErstellen,
  AdminMoebelErstellen,
  AdminKundenBestellungenVerwalten,
} from "./Admin/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/shop/*"
          element={
            <>
              <Header />
              <Container>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="KundenProdukte" element={<KundenProdukte />} />
                  <Route path="kleidung" element={<Kleidung />} />
                  <Route path="geraete" element={<Geraete />} />
                  <Route path="kundendaten" element={<KundenDaten />} />
             
                  <Route path="moebel" element={<Moebel />} />
                  <Route path="warenkorb" element={<Warenkorb />} />

                  <Route path="kategorie/view/:id" element={<View />} />

                  <Route
                    path="kategorie/view/suche/:name"
                    element={<ViewSuche />}
                  />

                </Routes>
              </Container>
              <Footer />
            </>
          }
        />

        <Route
          path="/admin/*"
          element={
            <>
              <AdminHeader />

              <Routes>
                <Route path="/" element={<AdminProdukteVerwalten />} />

                <Route path="registrieren" element={<AdminRegistrieren />} />
              </Routes>
            </>
          }
        />

        <Route
          path="/admin/dashboard/*"
          element={
            <>
              <AdminHeader />
              <Container />
              <Routes>
                <Route
                  path="Kunden_Daten_Verwalten"
                  element={<AdminKundenDatenVerwalten />}
                />
                <Route
                  path="Kunden_Produkte_Update/:id"
                  element={<AdminProdukteUpdate />}
                />
                
               
                <Route
                  path="Kunden_Bestellungen_Verwalten"
                  element={<AdminKundenBestellungenVerwalten />}
                />
                <Route
                  path="kleidung_erstellen"
                  element={<AdminKleidungErstellen />}
                />
                <Route
                  path="moebel_ertellen"
                  element={<AdminMoebelErstellen />}
                />
                <Route
                  path="geraete_ertellen"
                  element={<AdminGeraeteErstellen />}
                />
              </Routes>
            </>
          }
        />

        <Route
          path="/*"
          element={
            <>
              <Container>
                <Routes>
                  <Route
                    path="/registrieren"
                    element={<KundenRegistrieren />}
                  />
                  <Route path="/" element={<KundenLogin />} />
                </Routes>
              </Container>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
