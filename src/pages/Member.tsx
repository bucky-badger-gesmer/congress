import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { HeaderWithToggle } from "../components";

const Member: React.FC = () => {
  return (
    <IonPage>
      <HeaderWithToggle />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>Member Detail</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Member;
