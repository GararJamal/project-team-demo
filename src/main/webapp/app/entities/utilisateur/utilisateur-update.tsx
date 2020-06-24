import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRole } from 'app/shared/model/role.model';
import { getEntities as getRoles } from 'app/entities/role/role.reducer';
import { getEntity, updateEntity, createEntity, reset } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUtilisateurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UtilisateurUpdate = (props: IUtilisateurUpdateProps) => {
  const [idshave, setIdshave] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { utilisateurEntity, roles, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/utilisateur');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRoles();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.lASTSEEN = convertDateTimeToServer(values.lASTSEEN);
    values.dEACTIVATIONDATE = convertDateTimeToServer(values.dEACTIVATIONDATE);
    values.cREATEDAT = convertDateTimeToServer(values.cREATEDAT);
    values.uPDATEDAT = convertDateTimeToServer(values.uPDATEDAT);

    if (errors.length === 0) {
      const entity = {
        ...utilisateurEntity,
        ...values,
        have: mapIdList(values.have),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="projectTeamDemoApp.utilisateur.home.createOrEditLabel">
            <Translate contentKey="projectTeamDemoApp.utilisateur.home.createOrEditLabel">Create or edit a Utilisateur</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : utilisateurEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="utilisateur-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="utilisateur-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="eMAILLabel" for="utilisateur-eMAIL">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.eMAIL">E MAIL</Translate>
                </Label>
                <AvField id="utilisateur-eMAIL" type="text" name="eMAIL" />
              </AvGroup>
              <AvGroup>
                <Label id="pHONENUMBERLabel" for="utilisateur-pHONENUMBER">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.pHONENUMBER">P HONENUMBER</Translate>
                </Label>
                <AvField id="utilisateur-pHONENUMBER" type="text" name="pHONENUMBER" />
              </AvGroup>
              <AvGroup>
                <Label id="uSERNAMELabel" for="utilisateur-uSERNAME">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.uSERNAME">U SERNAME</Translate>
                </Label>
                <AvField id="utilisateur-uSERNAME" type="text" name="uSERNAME" />
              </AvGroup>
              <AvGroup>
                <Label id="lASTSEENLabel" for="utilisateur-lASTSEEN">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.lASTSEEN">L ASTSEEN</Translate>
                </Label>
                <AvInput
                  id="utilisateur-lASTSEEN"
                  type="datetime-local"
                  className="form-control"
                  name="lASTSEEN"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.utilisateurEntity.lASTSEEN)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dEACTIVATIONDATELabel" for="utilisateur-dEACTIVATIONDATE">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.dEACTIVATIONDATE">D EACTIVATIONDATE</Translate>
                </Label>
                <AvInput
                  id="utilisateur-dEACTIVATIONDATE"
                  type="datetime-local"
                  className="form-control"
                  name="dEACTIVATIONDATE"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.utilisateurEntity.dEACTIVATIONDATE)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fIRSTNAMELabel" for="utilisateur-fIRSTNAME">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.fIRSTNAME">F IRSTNAME</Translate>
                </Label>
                <AvField id="utilisateur-fIRSTNAME" type="text" name="fIRSTNAME" />
              </AvGroup>
              <AvGroup>
                <Label id="lASTNAMELabel" for="utilisateur-lASTNAME">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.lASTNAME">L ASTNAME</Translate>
                </Label>
                <AvField id="utilisateur-lASTNAME" type="text" name="lASTNAME" />
              </AvGroup>
              <AvGroup>
                <Label id="oCCUPATIONLabel" for="utilisateur-oCCUPATION">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.oCCUPATION">O CCUPATION</Translate>
                </Label>
                <AvField id="utilisateur-oCCUPATION" type="text" name="oCCUPATION" />
              </AvGroup>
              <AvGroup>
                <Label id="cITYLabel" for="utilisateur-cITY">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.cITY">C ITY</Translate>
                </Label>
                <AvField id="utilisateur-cITY" type="text" name="cITY" />
              </AvGroup>
              <AvGroup>
                <Label id="kINDLabel" for="utilisateur-kIND">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.kIND">K IND</Translate>
                </Label>
                <AvField id="utilisateur-kIND" type="text" name="kIND" />
              </AvGroup>
              <AvGroup>
                <Label id="cREATEDBYLabel" for="utilisateur-cREATEDBY">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.cREATEDBY">C REATEDBY</Translate>
                </Label>
                <AvField id="utilisateur-cREATEDBY" type="string" className="form-control" name="cREATEDBY" />
              </AvGroup>
              <AvGroup>
                <Label id="cREATEDATLabel" for="utilisateur-cREATEDAT">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.cREATEDAT">C REATEDAT</Translate>
                </Label>
                <AvInput
                  id="utilisateur-cREATEDAT"
                  type="datetime-local"
                  className="form-control"
                  name="cREATEDAT"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.utilisateurEntity.cREATEDAT)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="uPDATEDBYLabel" for="utilisateur-uPDATEDBY">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.uPDATEDBY">U PDATEDBY</Translate>
                </Label>
                <AvField id="utilisateur-uPDATEDBY" type="string" className="form-control" name="uPDATEDBY" />
              </AvGroup>
              <AvGroup>
                <Label id="uPDATEDATLabel" for="utilisateur-uPDATEDAT">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.uPDATEDAT">U PDATEDAT</Translate>
                </Label>
                <AvInput
                  id="utilisateur-uPDATEDAT"
                  type="datetime-local"
                  className="form-control"
                  name="uPDATEDAT"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.utilisateurEntity.uPDATEDAT)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="utilisateur-have">
                  <Translate contentKey="projectTeamDemoApp.utilisateur.have">Have</Translate>
                </Label>
                <AvInput
                  id="utilisateur-have"
                  type="select"
                  multiple
                  className="form-control"
                  name="have"
                  value={utilisateurEntity.have && utilisateurEntity.have.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {roles
                    ? roles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nAME}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/utilisateur" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  roles: storeState.role.entities,
  utilisateurEntity: storeState.utilisateur.entity,
  loading: storeState.utilisateur.loading,
  updating: storeState.utilisateur.updating,
  updateSuccess: storeState.utilisateur.updateSuccess,
});

const mapDispatchToProps = {
  getRoles,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UtilisateurUpdate);
