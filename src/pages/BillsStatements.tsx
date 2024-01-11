import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { HeaderWithToggle } from "../components";

const BillsStatements: React.FC = () => {
  return (
    <IonPage>
      <HeaderWithToggle />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>Bills & Statements</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BillsStatements;
