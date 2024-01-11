import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getMembers } from "../services";
import HeaderWithToggle from "../components/HeaderWithToggle";
import { checkbox, chevronForward, handLeft } from "ionicons/icons";

const Members: React.FC = () => {
  const [senateMembers, setSenateMembers] = useState([]);

  useEffect(() => {
    const setUp = async () => {
      const members = await getMembers();
      console.log("members", members);
      setSenateMembers(members);
    };

    setUp();
  }, []);

  return (
    <IonPage>
      <HeaderWithToggle />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonCard
                style={{
                  width: "100%",
                  maxWidth: "750px",
                }}
              >
                <IonList>
                  <IonListHeader>
                    <IonLabel>Senate Members</IonLabel>
                  </IonListHeader>
                  {senateMembers.map((senateMember: any, i) => (
                    <IonItem key={i}>
                      <IonAvatar aria-hidden="true" slot="start">
                        <IonImg
                          src={`https://theunitedstates.io/images/congress/225x275/${senateMember.id}.jpg`}
                          alt="Senate Member Avatar"
                        ></IonImg>
                      </IonAvatar>
                      <IonLabel>
                        {senateMember.first_name} {senateMember.last_name}
                      </IonLabel>
                      <IonIcon
                        slot="start"
                        color={
                          senateMember.party === "R" ? "danger" : "primary"
                        }
                        icon={checkbox}
                      ></IonIcon>
                      <IonIcon slot="end" icon={chevronForward} />
                    </IonItem>
                  ))}
                </IonList>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Members;
