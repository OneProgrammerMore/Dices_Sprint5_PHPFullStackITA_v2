import React from 'react';
import { withNavigation } from '../functions/withRouter.tsx';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

interface IProps {
  props?: React.PropsWithChildren;
}
interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

//export default class Home extends React.Component {
class Legal extends React.Component<IProps, IState> {
  //constructor(props: React.PropsWithChildren) {
  constructor(props: IProps) {
    super(props);
  }

  static contextType = MyContext;
  declare context: MyContextType;

  changeNavSectionAndUser = (userID: string, mainType: string) => {
    this.context.updateValueMainAndUserID(userID, mainType);
  };

  render() {
    return (
      <div className="legal">
        <h1>Legal Agreement for Dices Project</h1>

        <h2>1. Introduction</h2>
        <p>
          This &quot;Legal&quot; Agreement is made and entered into by and
          between the owner and developer of this Portfolio Project, and any
          person accessing or using the Project.
        </p>
        <p>
          This Project is a{' '}
          <strong>non-commercial, demonstration-only website</strong> intended
          solely for showcasing the Developer&apos;s skills to potential
          employers. It is not a commercially available product, and its purpose
          is strictly for job-seeking and educational purposes.
        </p>
        <p>
          By accessing or using the Project, the User agrees to the following
          terms and conditions.
        </p>

        <h2>2. Nature of the Project</h2>
        <p>
          The Project is a web-based application that allows users to register,
          log in, and interact with demo features. It does not offer any
          commercial services, paid subscriptions, or monetization. The
          Developer makes no warranties regarding the functionality, security,
          or data storage of the Project.
        </p>

        <h2>3. No Liability and Disclaimer</h2>
        <ul>
          <li>
            The Developer is not liable for any damages resulting from the use
            or inability to use the Project, including but not limited to
            security breaches, data loss, or service interruptions.
          </li>
          <li>
            The Project is provided &quot;as-is&quot; without any guarantees,
            express or implied, regarding security, privacy, or continued
            availability.
          </li>
          <li>
            The Developer is not responsible for any legal implications that may
            arise from third-party use of the Project.
          </li>
        </ul>

        <h2>4. User Data & Privacy</h2>
        <ul>
          <li>
            The Project does not collect, process, or store sensitive personal
            data beyond what is required for user authentication.
          </li>
          <li>
            The Developer does not guarantee compliance with privacy regulations
            such as{' '}
            <strong>
              GDPR (Europe), CCPA (California), and other global privacy laws
            </strong>
            .
          </li>
          <li>
            Users should avoid entering real, sensitive, or personally
            identifiable information (PII) into the Project.
          </li>
          <li>
            The Developer may delete user data at any time without notice.
          </li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          The Project, including its code, design, and content, remains the
          intellectual property of the Developer. Users may not copy,
          distribute, or claim ownership of any part of the Project.
        </p>

        <h2>6. Legal Jurisdiction</h2>
        <p>
          This Agreement shall be governed by the laws of the Developer&apos;s
          country of residence. Any disputes arising from the use of the Project
          shall be resolved under the applicable laws of the jurisdiction where
          the Developer resides.
        </p>

        <h2>7. Termination & Modification</h2>
        <p>
          The Developer reserves the right to modify, suspend, or terminate the
          Project at any time without notice. Users who violate this Agreement
          may have their access revoked.
        </p>
      </div>
    );
  }
}
export default withNavigation(Legal);
