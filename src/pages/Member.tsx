import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { HeaderWithToggle, LoadingSpinner } from "../components";
import { chevronBack } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMember } from "../services/propublicaService";

const Member: React.FC = () => {
  const history = useHistory();
  const params = useParams<any>();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>({});

  useEffect(() => {
    const setUp = async () => {
      const member = await getMember(params.id);
      setMember(member);
      setLoading(false);
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
                <IonCardHeader>
                  <IonIcon
                    icon={chevronBack}
                    onClick={() => {
                      history.push("/members");
                    }}
                    size="large"
                  />
                </IonCardHeader>
                <IonCardContent>
                  {loading && member !== null ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "centers",
                        }}
                      >
                        <div>
                          <IonImg
                            src={`https://theunitedstates.io/images/congress/225x275/${member.id}.jpg`}
                            alt="Senate Member Avatar"
                            style={{
                              maxWidth: "300px",
                            }}
                          ></IonImg>
                        </div>
                      </div>
                      <IonList>
                        <IonItem>
                          <IonText slot="start">Name</IonText>
                          <IonText slot="end">
                            {member.first_name} {member.last_name}
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">State</IonText>
                          <IonText slot="end">{member.roles[0].state}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Title</IonText>
                          <IonText slot="end">{member.roles[0].title}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Current Party</IonText>
                          <IonText slot="end">{member.current_party}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Gender</IonText>
                          <IonText slot="end">{member.gender}</IonText>
                        </IonItem>
                      </IonList>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Member;
