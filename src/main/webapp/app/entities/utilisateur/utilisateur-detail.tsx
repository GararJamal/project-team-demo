import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUtilisateurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UtilisateurDetail = (props: IUtilisateurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { utilisateurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="projectTeamDemoApp.utilisateur.detail.title">Utilisateur</Translate> [<b>{utilisateurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="eMAIL">
              <Translate contentKey="projectTeamDemoApp.utilisateur.eMAIL">E MAIL</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.eMAIL}</dd>
          <dt>
            <span id="pHONENUMBER">
              <Translate contentKey="projectTeamDemoApp.utilisateur.pHONENUMBER">P HONENUMBER</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.pHONENUMBER}</dd>
          <dt>
            <span id="uSERNAME">
              <Translate contentKey="projectTeamDemoApp.utilisateur.uSERNAME">U SERNAME</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.uSERNAME}</dd>
          <dt>
            <span id="lASTSEEN">
              <Translate contentKey="projectTeamDemoApp.utilisateur.lASTSEEN">L ASTSEEN</Translate>
            </span>
          </dt>
          <dd>
            {utilisateurEntity.lASTSEEN ? <TextFormat value={utilisateurEntity.lASTSEEN} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dEACTIVATIONDATE">
              <Translate contentKey="projectTeamDemoApp.utilisateur.dEACTIVATIONDATE">D EACTIVATIONDATE</Translate>
            </span>
          </dt>
          <dd>
            {utilisateurEntity.dEACTIVATIONDATE ? (
              <TextFormat value={utilisateurEntity.dEACTIVATIONDATE} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fIRSTNAME">
              <Translate contentKey="projectTeamDemoApp.utilisateur.fIRSTNAME">F IRSTNAME</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.fIRSTNAME}</dd>
          <dt>
            <span id="lASTNAME">
              <Translate contentKey="projectTeamDemoApp.utilisateur.lASTNAME">L ASTNAME</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.lASTNAME}</dd>
          <dt>
            <span id="oCCUPATION">
              <Translate contentKey="projectTeamDemoApp.utilisateur.oCCUPATION">O CCUPATION</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.oCCUPATION}</dd>
          <dt>
            <span id="cITY">
              <Translate contentKey="projectTeamDemoApp.utilisateur.cITY">C ITY</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.cITY}</dd>
          <dt>
            <span id="kIND">
              <Translate contentKey="projectTeamDemoApp.utilisateur.kIND">K IND</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.kIND}</dd>
          <dt>
            <span id="cREATEDBY">
              <Translate contentKey="projectTeamDemoApp.utilisateur.cREATEDBY">C REATEDBY</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.cREATEDBY}</dd>
          <dt>
            <span id="cREATEDAT">
              <Translate contentKey="projectTeamDemoApp.utilisateur.cREATEDAT">C REATEDAT</Translate>
            </span>
          </dt>
          <dd>
            {utilisateurEntity.cREATEDAT ? <TextFormat value={utilisateurEntity.cREATEDAT} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="uPDATEDBY">
              <Translate contentKey="projectTeamDemoApp.utilisateur.uPDATEDBY">U PDATEDBY</Translate>
            </span>
          </dt>
          <dd>{utilisateurEntity.uPDATEDBY}</dd>
          <dt>
            <span id="uPDATEDAT">
              <Translate contentKey="projectTeamDemoApp.utilisateur.uPDATEDAT">U PDATEDAT</Translate>
            </span>
          </dt>
          <dd>
            {utilisateurEntity.uPDATEDAT ? <TextFormat value={utilisateurEntity.uPDATEDAT} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="projectTeamDemoApp.utilisateur.have">Have</Translate>
          </dt>
          <dd>
            {utilisateurEntity.have
              ? utilisateurEntity.have.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.nAME}</a>
                    {utilisateurEntity.have && i === utilisateurEntity.have.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/utilisateur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/utilisateur/${utilisateurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ utilisateur }: IRootState) => ({
  utilisateurEntity: utilisateur.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UtilisateurDetail);
