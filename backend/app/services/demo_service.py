from app.models.schemas import DemoQuery

DEMOS = [
    DemoQuery(
        id="demo_1",
        title="Arbitration Separability",
        query="Does termination of a contract necessarily terminate the arbitration agreement contained in it?",
        description="Search for Supreme Court authorities on the doctrine of separability and survival of arbitration agreements after contract termination."
    ),
    DemoQuery(
        id="demo_2",
        title="Electronic Evidence",
        query="Can electronic communications support the existence of a contractual relationship where there is no formal written agreement?",
        description="Find authorities on formation of contracts through electronic communications and the evidentiary requirements under Section 65B."
    ),
    DemoQuery(
        id="demo_3",
        title="Doctrine of Separability",
        query="Show the Supreme Court authorities supporting the doctrine of separability.",
        description="Retrieve cases discussing the independence of the arbitration clause from the underlying contract."
    ),
    DemoQuery(
        id="demo_4",
        title="Right to Privacy",
        query="What is the constitutional basis for the right to privacy in India?",
        description="Find landmark Supreme Court judgments establishing privacy as a fundamental right under Article 21."
    ),
    DemoQuery(
        id="demo_5",
        title="Unstamped Arbitration Agreements",
        query="Is an arbitration agreement contained in an unstamped or insufficiently stamped underlying contract enforceable?",
        description="Explore the conflicting Supreme Court benches and the evolution of the law on unstamped arbitration agreements."
    ),
    DemoQuery(
        id="demo_6",
        title="Arbitrability of Fraud",
        query="Are allegations of serious fraud arbitrable in India?",
        description="Find how the Supreme Court differentiates between serious fraud and simple fraud in the context of arbitrability."
    ),
    DemoQuery(
        id="demo_7",
        title="Section 11 Referrals",
        query="What is the standard of review by the court when considering an application under Section 11 of the Arbitration Act?",
        description="Explore authorities on whether courts should do a prima facie review or detailed examination."
    ),
    DemoQuery(
        id="demo_8",
        title="Admissibility vs Proof",
        query="Does the requirement of a Section 65B certificate relate to admissibility or the standard of proof of electronic records?",
        description="Search for the mandatory nature of Section 65B of the Indian Evidence Act."
    )
]

def get_all_demos():
    return DEMOS

def get_demo(demo_id: str):
    for d in DEMOS:
        if d.id == demo_id:
            return d
    return None
