import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { HeaderWithToggle } from "../components";

const Votes: React.FC = () => {
  return (
    <IonPage>
      <HeaderWithToggle />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>Votes</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Votes;
