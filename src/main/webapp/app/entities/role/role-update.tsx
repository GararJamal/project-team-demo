import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { getEntities as getUtilisateurs } from 'app/entities/utilisateur/utilisateur.reducer';
import { getEntity, updateEntity, createEntity, reset } from './role.reducer';
import { IRole } from 'app/shared/model/role.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRoleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RoleUpdate = (props: IRoleUpdateProps) => {
  const [assignedToId, setAssignedToId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { roleEntity, utilisateurs, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/role');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUtilisateurs();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.cREATEDAT = convertDateTimeToServer(values.cREATEDAT);
    values.uPDATEDAT = convertDateTimeToServer(values.uPDATEDAT);

    if (errors.length === 0) {
      const entity = {
        ...roleEntity,
        ...values,
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
          <h2 id="projectTeamDemoApp.role.home.createOrEditLabel">
            <Translate contentKey="projectTeamDemoApp.role.home.createOrEditLabel">Create or edit a Role</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : roleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="role-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="role-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nAMELabel" for="role-nAME">
                  <Translate contentKey="projectTeamDemoApp.role.nAME">N AME</Translate>
                </Label>
                <AvField id="role-nAME" type="text" name="nAME" />
              </AvGroup>
              <AvGroup>
                <Label id="cODELabel" for="role-cODE">
                  <Translate contentKey="projectTeamDemoApp.role.cODE">C ODE</Translate>
                </Label>
                <AvField id="role-cODE" type="text" name="cODE" />
              </AvGroup>
              <AvGroup>
                <Label id="dESCRIPTIONLabel" for="role-dESCRIPTION">
                  <Translate contentKey="projectTeamDemoApp.role.dESCRIPTION">D ESCRIPTION</Translate>
                </Label>
                <AvField id="role-dESCRIPTION" type="text" name="dESCRIPTION" />
              </AvGroup>
              <AvGroup>
                <Label id="cREATEDBYLabel" for="role-cREATEDBY">
                  <Translate contentKey="projectTeamDemoApp.role.cREATEDBY">C REATEDBY</Translate>
                </Label>
                <AvField id="role-cREATEDBY" type="string" className="form-control" name="cREATEDBY" />
              </AvGroup>
              <AvGroup>
                <Label id="cREATEDATLabel" for="role-cREATEDAT">
                  <Translate contentKey="projectTeamDemoApp.role.cREATEDAT">C REATEDAT</Translate>
                </Label>
                <AvInput
                  id="role-cREATEDAT"
                  type="datetime-local"
                  className="form-control"
                  name="cREATEDAT"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.roleEntity.cREATEDAT)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="uPDATEDBYLabel" for="role-uPDATEDBY">
                  <Translate contentKey="projectTeamDemoApp.role.uPDATEDBY">U PDATEDBY</Translate>
                </Label>
                <AvField id="role-uPDATEDBY" type="string" className="form-control" name="uPDATEDBY" />
              </AvGroup>
              <AvGroup>
                <Label id="uPDATEDATLabel" for="role-uPDATEDAT">
                  <Translate contentKey="projectTeamDemoApp.role.uPDATEDAT">U PDATEDAT</Translate>
                </Label>
                <AvInput
                  id="role-uPDATEDAT"
                  type="datetime-local"
                  className="form-control"
                  name="uPDATEDAT"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.roleEntity.uPDATEDAT)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/role" replace color="info">
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
  utilisateurs: storeState.utilisateur.entities,
  roleEntity: storeState.role.entity,
  loading: storeState.role.loading,
  updating: storeState.role.updating,
  updateSuccess: storeState.role.updateSuccess,
});

const mapDispatchToProps = {
  getUtilisateurs,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RoleUpdate);
