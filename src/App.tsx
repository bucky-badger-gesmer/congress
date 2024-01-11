import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  checkbox,
  documents,
  ellipse,
  extensionPuzzle,
  people,
  square,
  triangle,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { BillsStatements, Committess, Members, Votes } from "./pages";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/members">
            <Members />
          </Route>
          <Route exact path="/billsstatements">
            <BillsStatements />
          </Route>
          <Route path="/votes">
            <Votes />
          </Route>
          <Route path="/committees">
            <Committess />
          </Route>
          <Route exact path="/">
            <Redirect to="/members" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="members" href="/members">
            <IonIcon aria-hidden="true" icon={people} />
            <IonLabel>Members</IonLabel>
          </IonTabButton>
          <IonTabButton tab="billsstatements" href="/billsstatements">
            <IonIcon aria-hidden="true" icon={documents} />
            <IonLabel>Bills & Statements</IonLabel>
          </IonTabButton>
          <IonTabButton tab="votes" href="/votes">
            <IonIcon aria-hidden="true" icon={checkbox} />
            <IonLabel>Votes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="committees" href="/committees">
            <IonIcon aria-hidden="true" icon={extensionPuzzle} />
            <IonLabel>Committees</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
