package com.mecanica.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ClasificacionAutomovil.
 */
@Entity
@Table(name = "clasificacion_automovil")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ClasificacionAutomovil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "clasificacion")
    private String clasificacion;

    @OneToMany(mappedBy = "clasificacionAutomovil")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Automovil> automovils = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClasificacion() {
        return clasificacion;
    }

    public ClasificacionAutomovil clasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
        return this;
    }

    public void setClasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
    }

    public Set<Automovil> getAutomovils() {
        return automovils;
    }

    public ClasificacionAutomovil automovils(Set<Automovil> automovils) {
        this.automovils = automovils;
        return this;
    }

    public ClasificacionAutomovil addAutomovil(Automovil automovil) {
        this.automovils.add(automovil);
        automovil.setClasificacionAutomovil(this);
        return this;
    }

    public ClasificacionAutomovil removeAutomovil(Automovil automovil) {
        this.automovils.remove(automovil);
        automovil.setClasificacionAutomovil(null);
        return this;
    }

    public void setAutomovils(Set<Automovil> automovils) {
        this.automovils = automovils;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClasificacionAutomovil)) {
            return false;
        }
        return id != null && id.equals(((ClasificacionAutomovil) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClasificacionAutomovil{" +
            "id=" + getId() +
            ", clasificacion='" + getClasificacion() + "'" +
            "}";
    }
}
