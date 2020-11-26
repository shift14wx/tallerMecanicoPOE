package com.mecanica.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A EstadoAveria.
 */
@Entity
@Table(name = "estado_averia")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EstadoAveria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "estado")
    private String estado;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "estadoAveria")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Averia> averias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public EstadoAveria estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public EstadoAveria descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Averia> getAverias() {
        return averias;
    }

    public EstadoAveria averias(Set<Averia> averias) {
        this.averias = averias;
        return this;
    }

    public EstadoAveria addAveria(Averia averia) {
        this.averias.add(averia);
        averia.setEstadoAveria(this);
        return this;
    }

    public EstadoAveria removeAveria(Averia averia) {
        this.averias.remove(averia);
        averia.setEstadoAveria(null);
        return this;
    }

    public void setAverias(Set<Averia> averias) {
        this.averias = averias;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EstadoAveria)) {
            return false;
        }
        return id != null && id.equals(((EstadoAveria) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EstadoAveria{" +
            "id=" + getId() +
            ", estado='" + getEstado() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
