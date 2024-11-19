import { CSSProperties } from 'react';
import {
  Button,
  Column,
  Container,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { EmailTemplateLayout } from './EmailTemplateLayout';

export interface EstimatePaymentEmailProps {
  preview: string;

  // # Company
  companyName?: string;
  companyLogoUri: string;

  // # Colors
  primaryColor?: string;

  // # Total
  total: string;
  totalLabel?: string;

  // # Estimate No#
  estimateNumber?: string;
  estimateNumberLabel?: string;

  // # Expiration date.
  expirationDateLabel?: string;
  expirationDate?: string;

  // # Items
  items: Array<{ label: string; quantity: string; rate: string }>;

  // # View estimate button.
  viewEstimateButtonLabel?: string;
  viewEstimateButtonUrl?: string;

  // # Estimate message
  message?: string;
}

export const EstimatePaymentEmail: React.FC<
  Readonly<EstimatePaymentEmailProps>
> = ({
  preview,

  // # Company
  companyName,
  companyLogoUri,

  // # Colors
  primaryColor = 'rgb(0, 82, 204)',

  // # invoice total
  total,
  totalLabel = 'Total',

  // # Estimate No#
  estimateNumberLabel = 'Estimate No: {estimateNumber}',
  estimateNumber = 'EST-00001',

  // # Expiration date
  expirationDateLabel = 'Expiration Date: {expirationDate}',
  expirationDate = '12/12/2021',

  // # View invoice button
  viewEstimateButtonLabel = 'View Estimate',
  viewEstimateButtonUrl,

  // # Message
  message = '',

  // # Items
  items = [],
}) => {
    return (
      <EmailTemplateLayout preview={preview}>
        <Container style={containerStyle}>
          {companyLogoUri && (
            <Section style={logoSectionStyle}>
              <div
                style={{
                  ...companyLogoStyle,
                  backgroundImage: `url("${companyLogoUri}")`,
                }}
              ></div>
            </Section>
          )}

          <Section style={headerInfoStyle}>
            <Row>
              <Heading style={invoiceCompanyNameStyle}>{companyName}</Heading>
            </Row>
            <Row>
              <Text style={estimateAmountStyle}>{total}</Text>
            </Row>
            <Row>
              <Text style={estimateNumberStyle}>
                {estimateNumberLabel?.replace('{estimateNumber}', estimateNumber)}
              </Text>
            </Row>
            <Row>
              <Text style={estimateExpirationStyle}>
                {expirationDateLabel.replace('{expirationDate}', expirationDate)}
              </Text>
            </Row>
          </Section>

          <Text style={estimateMessageStyle}>{message}</Text>
          <Button
            href={viewEstimateButtonUrl}
            style={{
              ...viewEstimateButtonStyle,
              backgroundColor: primaryColor,
            }}
          >
            {viewEstimateButtonLabel}
          </Button>

          <Section style={totalsSectionStyle}>
            {items.map((item, index) => (
              <Row key={index} style={itemLineRowStyle}>
                <Column width={'50%'}>
                  <Text style={listItemLabelStyle}>{item.label}</Text>
                </Column>

                <Column width={'50%'}>
                  <Text style={listItemAmountStyle}>
                    {item.quantity} x {item.rate}
                  </Text>
                </Column>
              </Row>
            ))}

            <Row style={totalLineRowStyle}>
              <Column width={'50%'}>
                <Text style={totalLineItemLabelStyle}>{totalLabel}</Text>
              </Column>

              <Column width={'50%'}>
                <Text style={totalLineItemAmountStyle}>{total}</Text>
              </Column>
            </Row>
          </Section>

        </Container>
      </EmailTemplateLayout>
    );
  };

const containerStyle: CSSProperties = {
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: '500px',
  padding: '35px 25px',
  color: '#000',
  borderRadius: '5px',
};

const headerInfoStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: 20,
};

const estimateAmountStyle: CSSProperties = {
  margin: 0,
  color: '#383E47',
  fontWeight: 500,
};
const estimateNumberStyle: CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#404854',
};
const estimateExpirationStyle: CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#404854',
};

const invoiceCompanyNameStyle: CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 500,
  color: '#404854',
};

const viewEstimateButtonStyle: CSSProperties = {
  display: 'block',
  cursor: 'pointer',
  textAlign: 'center',
  fontSize: 16,
  padding: '10px 15px',
  lineHeight: '1',
  backgroundColor: 'rgb(0, 82, 204)',
  color: '#fff',
  borderRadius: '5px',
};

const listItemLabelStyle: CSSProperties = {
  margin: 0,
};

const listItemAmountStyle: CSSProperties = {
  margin: 0,
  textAlign: 'right',
};

const estimateMessageStyle: CSSProperties = {
  whiteSpace: 'pre-line',
  color: '#252A31',
  margin: '0 0 20px 0',
  lineHeight: '20px',
};
const totalLineRowStyle: CSSProperties = {
  borderBottom: '1px solid #000',
  height: 40,
};

const totalLineItemLabelStyle: CSSProperties = {
  ...listItemLabelStyle,
  fontWeight: 500,
};

const totalLineItemAmountStyle: CSSProperties = {
  ...listItemAmountStyle,
  fontWeight: 600,
};

const itemLineRowStyle: CSSProperties = {
  borderBottom: '1px solid #D9D9D9',
  height: 40,
};

const totalsSectionStyle = {
  marginTop: '20px',
  borderTop: '1px solid #D9D9D9',
};

const logoSectionStyle = {
  marginBottom: '15px',
};

const companyLogoStyle = {
  height: 90,
  width: 90,
  borderRadius: '3px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textIndent: '-999999px',
  overflow: 'hidden',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'contain',
};
