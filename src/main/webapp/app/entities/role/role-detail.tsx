import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './role.reducer';
import { IRole } from 'app/shared/model/role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RoleDetail = (props: IRoleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { roleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="projectTeamDemoApp.role.detail.title">Role</Translate> [<b>{roleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nAME">
              <Translate contentKey="projectTeamDemoApp.role.nAME">N AME</Translate>
            </span>
          </dt>
          <dd>{roleEntity.nAME}</dd>
          <dt>
            <span id="cODE">
              <Translate contentKey="projectTeamDemoApp.role.cODE">C ODE</Translate>
            </span>
          </dt>
          <dd>{roleEntity.cODE}</dd>
          <dt>
            <span id="dESCRIPTION">
              <Translate contentKey="projectTeamDemoApp.role.dESCRIPTION">D ESCRIPTION</Translate>
            </span>
          </dt>
          <dd>{roleEntity.dESCRIPTION}</dd>
          <dt>
            <span id="cREATEDBY">
              <Translate contentKey="projectTeamDemoApp.role.cREATEDBY">C REATEDBY</Translate>
            </span>
          </dt>
          <dd>{roleEntity.cREATEDBY}</dd>
          <dt>
            <span id="cREATEDAT">
              <Translate contentKey="projectTeamDemoApp.role.cREATEDAT">C REATEDAT</Translate>
            </span>
          </dt>
          <dd>{roleEntity.cREATEDAT ? <TextFormat value={roleEntity.cREATEDAT} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="uPDATEDBY">
              <Translate contentKey="projectTeamDemoApp.role.uPDATEDBY">U PDATEDBY</Translate>
            </span>
          </dt>
          <dd>{roleEntity.uPDATEDBY}</dd>
          <dt>
            <span id="uPDATEDAT">
              <Translate contentKey="projectTeamDemoApp.role.uPDATEDAT">U PDATEDAT</Translate>
            </span>
          </dt>
          <dd>{roleEntity.uPDATEDAT ? <TextFormat value={roleEntity.uPDATEDAT} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/role" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/role/${roleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ role }: IRootState) => ({
  roleEntity: role.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetail);
