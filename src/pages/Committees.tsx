import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { HeaderWithToggle } from "../components";

const Committees: React.FC = () => {
  return (
    <IonPage>
      <HeaderWithToggle />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>Committees</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Committees;
