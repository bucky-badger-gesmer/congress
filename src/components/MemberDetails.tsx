import { IonItem, IonList, IonListHeader, IonText } from "@ionic/react";

interface MemberDetailsProps {
  member: any;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({
  member,
}: MemberDetailsProps) => {
  return (
    <>
      <IonList>
        <IonItem>
          <IonText slot="start">Name</IonText>
          <IonText slot="end">
            <strong>
              {member.first_name} {member.last_name}
            </strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">State</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].state}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Title</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].title}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Leadership Role</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].leadership_role || "N/A"}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Current Party</IonText>
          <IonText slot="end">
            <strong>{member.current_party}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Gender</IonText>
          <IonText slot="end">
            <strong>{member.gender}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Experience</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].seniority} Years</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Total Votes</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].total_votes}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Missed Votes</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].missed_votes}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Present Votes</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].total_present}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Bills Sponsored</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].bills_sponsored}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Bills Co-Sponsored</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].bills_cosponsored}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Missed Votes %</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].missed_votes_pct}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Votes With Party %</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].votes_with_party_pct}</strong>
          </IonText>
        </IonItem>
        <IonItem>
          <IonText slot="start">Votes Against Party %</IonText>
          <IonText slot="end">
            <strong>{member.roles[0].votes_against_party_pct}</strong>
          </IonText>
        </IonItem>
      </IonList>
      <IonList>
        <IonListHeader>
          <IonText>
            <h1>Committees</h1>
          </IonText>
        </IonListHeader>
        {member.roles[0].committees.map((committee: any) => {
          return (
            <IonItem>
              <IonText slot="start">
                {committee.title}, {committee.name}
              </IonText>
            </IonItem>
          );
        })}
      </IonList>
      <IonList>
        <IonListHeader>
          <IonText>
            <h1>Subcommittees</h1>
          </IonText>
        </IonListHeader>
        {member.roles[0].subcommittees.map((subcommittee: any) => {
          return (
            <IonItem>
              <IonText slot="start">
                {subcommittee.title}, {subcommittee.name}
              </IonText>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};

export default MemberDetails;
