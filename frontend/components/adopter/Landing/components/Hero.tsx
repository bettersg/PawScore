import { Button } from "antd";
import styled from "styled-components";
import { VerticalDivider } from "./common";

const PICTURE_ONE =
	"https://s3-alpha-sig.figma.com/img/9861/f53a/4d3b4f7d2d6a398ede84893b8fabe592?Expires=1634515200&Signature=KX3CkCZodsB22HHE285MWvVxBVcDDIVQfqVgC2Lqk1Ed4GHMBgytSrGYN7fz0wtAVwyZKGg4LRbC743HKg1UF0oGEET8bCRh601Tb5CUWSA9d8r2WtLN0fZV0oQk-xIKbVS16zYADV6JvPS80WZUR8RWsundUf0QKKdNVNFDSPypLV~wg0LC2AE8FGibiWAEWdj7AbPCJjN-vCaGil6vlyhjslkk1m2alNCrxIRC4x7BzzlY2tAjZHx9f8bNfiRTKpoMzU-kE4f93xL1yD38DzlqdMKlKludgKE6m2q9wbLmCQnMAKctf9r8CmjCPzi15lNA1VfOGC54hN9dIwedVw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
const PICTURE_TWO =
	"https://s3-alpha-sig.figma.com/img/2b6d/3bc0/43bf8329f2b471a1415dc11514f9c73a?Expires=1634515200&Signature=dICcXe2mjK301z~qJyPUHchqMQbLtSVExlzDOBsa5ksbZ58ZOz1KbIwhdcoHkEbem85pniS-hFg~~HLebjXs2zSzCyOuDMTcJSyIK7HEHv~kiT7K41JkPglfkZgtbrfUgOcgTPdQPmqytGeGhkZEAYTc8ryHo6vAyEQcwdYiuBYM2C5OBO~KpQpEbdcoctdI11ihorx-UgcWTOCj4frZn~Ugo1kWkwJWXPnAg7QAYL4BPhLM1gsTmjVLojV3h4pVQMlZIfiK7915UTcddYR0Ce8MU-XbC~022gaNNiH6pAy-Q7JJWem2mnhbqe-LjRzQQOI0F2Bl4ZD03EohPvkXOg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
const PICTURE_THREE =
	"https://s3-alpha-sig.figma.com/img/ec4c/dafd/04273982dc511e6eb4b19dc66649bda8?Expires=1634515200&Signature=CMTzd91SyjBvNg554dF9Qil0BWjeJpEQo17HixPO8cs8emL~TSD62OLtLGNGSNxR90SYxrbxXa2Ierdz4rnxqIiFRql9aGMpCxZodPSroo8p~VaY5wkx4qnjd6iWkLYLswgqEK3zTh1v4sfXTZF6GTuSK1Nut2VkjXXBBsUxwI1tzzi9HdHWrsTv-lNZLzKKtvRf-ncJBBRWXiQRzSQgE-dojZCthiTupRp-BLePnMJ693-Gzn4o6rT7BUYwoaULMnFjMRJeme48L4~WLluT27K9BlK~xHmY4YwMTmgOCQbjbjyMAT-ce6kJWlI6FcP1YydZzd6JM6fkqFIjEKur2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

const Hero = () => (
	<Container>
		<HeroSection>
			<HeroHeader>
				Want to make a difference for our animal friends? You can help
				them by
			</HeroHeader>
			<AdoptButton size="large">Adopt</AdoptButton>
			<div className="donate">Or donate to our animals</div>
		</HeroSection>
		<VerticalDivider />
		<HeroSection>
			<div>
				<img src={PICTURE_ONE} alt="pic_1" width="220" />
			</div>
			<div>
				<div>
					<img src={PICTURE_TWO} alt="pic_2" width="263" />
				</div>
				<ImgDivider />
				<div>
					<img src={PICTURE_THREE} alt="pic_3" width="263" />
				</div>
			</div>
		</HeroSection>
	</Container>
);
export default Hero;

// =============================================================================
// Styled Components
// =============================================================================
const Container = styled.div`
	height: 631px;
	background-color: var(--color-hero-background);
	display: flex;
	padding: 0 15%;
	align-items: center;
`;

const HeroSection = styled.div`
	width: 50%;
	color: #11025a;

	:first-child .donate {
		font-family: Poppins;
		font-size: 15px;
		text-decoration: underline;
		margin-top: 20px;
	}

	:last-child {
		display: flex;
		align-items: center;
		img {
			border-radius: 7px;
		}

		> div:first-child img {
			margin-right: 13px;
		}
	}
`;

const HeroHeader = styled.div`
	font-family: Ubuntu;

	font-size: 40px;
	line-height: 50px;
	margin-bottom: 70px;
`;

const AdoptButton = styled(Button)`
	background: var(--color-orange);
	border-color: var(--color-orange);
	border-radius: 7px;

	font-family: Poppins;
	font-size: 18px;
	color: #11025a;
`;

const ImgDivider = styled.div`
	height: 14px;
`;
