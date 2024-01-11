import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToggleCustomEvent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getMembers } from "../services";
import { moon, settings, sunny } from "ionicons/icons";

const Members: React.FC = () => {
  const [senateMembers, setSenateMembers] = useState([]);
  const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  useEffect(() => {
    const foo = async () => {
      const members = await getMembers();
      console.log("members", members);
      setSenateMembers(members);
    };

    foo();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>U.S. Congress</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={sunny} style={{ marginRight: "12px" }} />
            <IonToggle
              onIonChange={toggleDarkModeHandler}
              justify="space-between"
            ></IonToggle>
            <IonIcon icon={moon} style={{ marginLeft: "12px" }} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>Senate Members</IonLabel>
              {senateMembers.map((senateMember: any, i) => (
                <div key={i}>
                  {senateMember.first_name} {senateMember.last_name}
                </div>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Members;
