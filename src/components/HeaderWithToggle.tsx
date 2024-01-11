import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { moon, sunny } from "ionicons/icons";

const HeaderWithToggle: React.FC = () => {
  const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">U.S. Congress</IonTitle>
        <IonButtons slot="end">
          <IonIcon icon={sunny} style={{ marginRight: "12px" }} />
          <IonToggle
            onIonChange={toggleDarkModeHandler}
            justify="space-between"
          ></IonToggle>
          <IonIcon
            icon={moon}
            style={{ marginLeft: "12px", marginRight: "12px" }}
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderWithToggle;
