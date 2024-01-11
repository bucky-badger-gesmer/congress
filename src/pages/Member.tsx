import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { HeaderWithToggle, LoadingSpinner, MemberDetails } from "../components";
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
                              marginBottom: "24px",
                            }}
                          ></IonImg>
                        </div>
                      </div>
                      <MemberDetails member={member} />
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
